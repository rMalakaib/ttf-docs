import type { ValidationResult, ValidationError } from "@/lib/csv-ingress/types"
import { parseCsvField } from "./csv-utils"

export interface TextValidationResult extends ValidationResult {
  parsedData?: string
  formattingDetected?: {
    bold: boolean
    italic: boolean
    bulletLists: boolean
    tables: boolean
    lineBreaks: boolean
  }
}

export function validateText(answerText: string): TextValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for empty content
  if (!answerText || answerText.trim().length === 0) {
    errors.push({
      field: "answerText",
      message: "Text answer cannot be empty",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Parse CSV field escaping (handles "" -> ", removes outer quotes)
  let text = parseCsvField(answerText)

  // Convert \n escape sequences to actual newlines for text content
  text = text.replace(/\\n/g, '\n')

  // Detect formatting - check for newlines
  const formattingDetected = {
    bold: /\*\*[^*]+\*\*/.test(text),
    italic: /(?<!\*)\*[^*]+\*(?!\*)/.test(text),
    bulletLists: /\n-\s/.test(text) || text.startsWith("- "),
    tables: /\|[^|]+\|/.test(text) && /\|\s*---\s*\|/.test(text),
    lineBreaks: text.includes("\n")
  }

  // Warn if no formatting detected for long text
  const hasAnyFormatting = Object.values(formattingDetected).some(v => v)
  if (text.length > 200 && !hasAnyFormatting) {
    warnings.push({
      field: "formatting",
      message: "Long text without markdown formatting detected. Consider using **bold**, *italic*, bullet lists, or tables for better readability.",
      severity: "warning"
    })
  }

  // Check for unmatched markdown
  const boldMatches = text.match(/\*\*/g)
  if (boldMatches && boldMatches.length % 2 !== 0) {
    warnings.push({
      field: "bold",
      message: "Unmatched ** detected. Bold text requires opening and closing **.",
      severity: "warning"
    })
  }

  const italicMatches = text.match(/(?<!\*)\*(?!\*)/g)
  if (italicMatches && italicMatches.length % 2 !== 0) {
    warnings.push({
      field: "italic",
      message: "Unmatched * detected. Italic text requires opening and closing *.",
      severity: "warning"
    })
  }

  // Check table formatting
  if (formattingDetected.tables) {
    const tableLines = text.split(/\n/).filter(line => line.includes("|"))
    if (tableLines.length > 0) {
      const firstLineCols = (tableLines[0].match(/\|/g) || []).length
      const inconsistentRows = tableLines.filter(line => {
        const cols = (line.match(/\|/g) || []).length
        return cols !== firstLineCols
      })
      if (inconsistentRows.length > 0) {
        warnings.push({
          field: "table",
          message: "Table rows have inconsistent column counts. Ensure all rows have the same number of | separators.",
          severity: "warning"
        })
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    parsedData: text,
    formattingDetected
  }
}

/**
 * Convert markdown text to HTML for preview
 * Input should be the parsed CSV field (after removing outer quotes and unescaping "")
 */
export function markdownToHtml(markdown: string): string {
  // First parse CSV escaping if present
  let html = parseCsvField(markdown)

  // Convert \n escape sequences to actual newlines
  html = html.replace(/\\n/g, '\n')

  // Convert actual newlines to <br> for HTML display
  html = html.replace(/\n/g, "<br>")

  // Convert bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")

  // Convert italic (but not inside bold)
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")

  // Convert bullet lists
  const lines = html.split("<br>")
  let inList = false
  const processedLines: string[] = []

  for (const line of lines) {
    if (line.trim().startsWith("- ")) {
      if (!inList) {
        processedLines.push("<ul>")
        inList = true
      }
      processedLines.push(`<li>${line.trim().substring(2)}</li>`)
    } else {
      if (inList) {
        processedLines.push("</ul>")
        inList = false
      }
      processedLines.push(line)
    }
  }
  if (inList) {
    processedLines.push("</ul>")
  }
  // Join with <br> to preserve line breaks for non-list content
  html = processedLines.join("<br>")

  // Convert tables
  html = convertTablesToHtml(html)

  // Convert headers
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>")
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>")

  return html
}

function convertTablesToHtml(html: string): string {
  // Simple table detection and conversion
  const tableRegex = /\|(.+)\|[\s\S]*?\|\s*---[\s\S]*?\|[\s\S]*?(?=(?:<br><br>)|$)/g

  return html.replace(tableRegex, (match) => {
    const rows = match.split("<br>").filter(r => r.trim() && r.includes("|"))
    if (rows.length < 2) return match

    let tableHtml = "<table class='markdown-table'>"

    rows.forEach((row, index) => {
      // Skip separator row
      if (row.includes("---")) return

      const cells = row.split("|").filter(c => c.trim())
      const tag = index === 0 ? "th" : "td"
      const rowTag = index === 0 ? "thead" : (index === 1 ? "tbody" : "")

      if (index === 0) tableHtml += "<thead>"
      if (index === 1) tableHtml += "<tbody>"

      tableHtml += "<tr>"
      cells.forEach(cell => {
        tableHtml += `<${tag}>${cell.trim()}</${tag}>`
      })
      tableHtml += "</tr>"

      if (index === 0) tableHtml += "</thead>"
    })

    tableHtml += "</tbody></table>"
    return tableHtml
  })
}
