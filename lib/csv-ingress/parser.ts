import type { CsvRow, ParsedCsvResult } from "./types"

/**
 * Parse a CSV string with two columns: order, answerText
 * Handles:
 * - Quoted fields with commas
 * - Escaped quotes ("" inside quoted fields)
 * - JSON strings in answerText column
 */
export function parseCsv(csvText: string): ParsedCsvResult {
  const errors: string[] = []
  const warnings: string[] = []
  const rows: CsvRow[] = []

  const lines = splitCsvLines(csvText)

  if (lines.length === 0) {
    errors.push("CSV file is empty")
    return { rows, errors, warnings }
  }

  // Parse header row
  const headerRow = parseCsvLine(lines[0])
  const orderIndex = headerRow.findIndex(
    (h) => h.toLowerCase().trim() === "order"
  )
  const answerTextIndex = headerRow.findIndex(
    (h) => h.toLowerCase().trim() === "answertext"
  )

  if (orderIndex === -1) {
    errors.push("Missing required column: 'order'")
    return { rows, errors, warnings }
  }

  if (answerTextIndex === -1) {
    errors.push("Missing required column: 'answerText'")
    return { rows, errors, warnings }
  }

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue // Skip empty lines

    const fields = parseCsvLine(line)
    const lineNum = i + 1

    const orderStr = fields[orderIndex]?.trim()
    const answerText = fields[answerTextIndex]?.trim()

    // Validate order
    const order = parseInt(orderStr, 10)
    if (!Number.isFinite(order) || order < 1) {
      errors.push(`Row ${lineNum}: Invalid order value "${orderStr}"`)
      continue
    }

    // answerText can be empty (skip warning for now)
    if (!answerText) {
      warnings.push(`Row ${lineNum}: Empty answerText for order ${order}`)
    }

    rows.push({ order, answerText: answerText || "" })
  }

  // Check for duplicate orders
  const orderCounts = new Map<number, number>()
  for (const row of rows) {
    orderCounts.set(row.order, (orderCounts.get(row.order) || 0) + 1)
  }
  orderCounts.forEach((count, order) => {
    if (count > 1) {
      warnings.push(`Order ${order} appears ${count} times - later entries will overwrite earlier ones`)
    }
  })

  return { rows, errors, warnings }
}

/**
 * Split CSV text into lines, handling newlines within quoted fields
 */
function splitCsvLines(text: string): string[] {
  const lines: string[] = []
  let currentLine = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    if (char === '"') {
      // Check for escaped quote
      if (inQuotes && text[i + 1] === '"') {
        currentLine += '""'
        i++ // Skip next quote
      } else {
        inQuotes = !inQuotes
        currentLine += char
      }
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      // End of line (only if not inside quotes)
      if (currentLine.trim()) {
        lines.push(currentLine)
      }
      currentLine = ""
      // Skip \r\n combo
      if (char === "\r" && text[i + 1] === "\n") {
        i++
      }
    } else {
      currentLine += char
    }
  }

  // Don't forget the last line
  if (currentLine.trim()) {
    lines.push(currentLine)
  }

  return lines
}

/**
 * Parse a single CSV line into fields, handling quoted values
 */
function parseCsvLine(line: string): string[] {
  const fields: string[] = []
  let currentField = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      if (!inQuotes) {
        // Start of quoted field
        inQuotes = true
      } else if (line[i + 1] === '"') {
        // Escaped quote inside quoted field
        currentField += '"'
        i++ // Skip next quote
      } else {
        // End of quoted field
        inQuotes = false
      }
    } else if (char === "," && !inQuotes) {
      // Field separator
      fields.push(currentField)
      currentField = ""
    } else {
      currentField += char
    }
  }

  // Don't forget the last field
  fields.push(currentField)

  return fields
}

/**
 * Read a File object and return its text content
 */
export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}
