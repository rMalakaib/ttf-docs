"use client"

import type { FinancialStatementJSON, Section, Row, StatementType } from "@/types/financial/financial-statements"

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ### **Financial Statement Helper**

#### **Saving Data (Component → Backend)**

\`\`\`typescript
import { parseFinancialStatement } from "@/lib/financial/financial-statement-helpers"

// In your component or API route
function saveToBackend(statementData: FinancialStatementJSON) {
  // Convert to JSON string for backend storage
  const jsonString = JSON.stringify(statementData)
  
  // Send to your backend
  await fetch('/api/financial-statements', {
    method: 'POST',
    body: JSON.stringify({ data: jsonString }),
  })
}
\`\`\`

#### **Loading Data (Backend → Component)**

\`\`\`typescript
import { 
  parseFinancialStatement, 
  validateFinancialStatement,
  getFinancialStatementSummary 
} from "@/lib/financial/financial-statement-helpers"

// Fetch from backend
async function loadFromBackend(statementId: string) {
  const response = await fetch(`/api/financial-statements/${statementId}`)
  const { data } = await response.json() // data is a JSON string
  
  // Parse and validate the JSON string
  const statement = parseFinancialStatement(data)
  
  if (!validateFinancialStatement(statement)) {
    throw new Error("Invalid financial statement data")
  }
  
  // Now you can use this data in your component
  return statement
}

// In your component
function MyComponent() {
  const [statement, setStatement] = useState<FinancialStatementJSON | null>(null)
  
  useEffect(() => {
    loadFromBackend('statement-123').then(data => {
      setStatement(data)
      // You can now pass this to FinancialStatementEditor as initial data
    })
  }, [])
  
  // Get a summary of the data
  if (statement) {
    const summary = getFinancialStatementSummary(statement)
    console.log(`Statement has ${summary.totalSections} sections`)
  }
}
\`\`\`
*/

/**
 * Parse a JSON string into a FinancialStatementJSON object
 * @param jsonString - The JSON string from the backend
 * @returns Parsed FinancialStatementJSON object or null if invalid
 */
export function parseFinancialStatementJSON(jsonString: string): FinancialStatementJSON | null {
  try {
    const parsed = JSON.parse(jsonString)
    return validateFinancialStatementJSON(parsed) ? parsed : null
  } catch (error) {
    console.error("[Financial Statement Helper] Failed to parse JSON:", error)
    return null
  }
}

/**
 * Validate that an object matches the FinancialStatementJSON structure
 * @param data - The object to validate
 * @returns True if valid, false otherwise
 */
export function validateFinancialStatementJSON(data: any): data is FinancialStatementJSON {
  if (!data || typeof data !== "object") return false

  // Check for required top-level properties
  if (!data.incomeStatement || !data.balanceSheet || !data.cashFlowStatement || !data.meta) {
    return false
  }

  // Check meta structure - period is now optional
  if (!data.meta.currency || !data.meta.timestamp || !data.meta.version) {
    return false
  }

  // Validate each statement has blocks array
  const statements = [data.incomeStatement, data.balanceSheet, data.cashFlowStatement]
  for (const statement of statements) {
    if (!statement.blocks || !Array.isArray(statement.blocks)) {
      return false
    }
  }

  return true
}

/**
 * Extract sections for a specific statement type
 * @param data - The full FinancialStatementJSON object
 * @param statementType - Which statement to extract
 * @returns Array of sections for that statement
 */
export function extractSections(data: FinancialStatementJSON, statementType: StatementType): Section[] {
  switch (statementType) {
    case "incomeStatement":
      return data.incomeStatement.blocks
    case "balanceSheet":
      return data.balanceSheet.blocks
    case "cashFlowStatement":
      return data.cashFlowStatement.blocks
  }
}

/**
 * Rebuild the component state from saved JSON
 * @param jsonString - The JSON string from the backend
 * @returns Object with sections for each statement type and metadata, or null if invalid
 */
export function rebuildFinancialStatementState(jsonString: string): {
  incomeStatement: Section[]
  balanceSheet: Section[]
  cashFlowStatement: Section[]
  companyName: string
  currency: string
  period?: string // Added period as a direct field
  meta: FinancialStatementJSON["meta"]
} | null {
  const data = parseFinancialStatementJSON(jsonString)
  if (!data) return null

  const period = (data as any).period || data.meta.period || undefined

  return {
    incomeStatement: data.incomeStatement.blocks,
    balanceSheet: data.balanceSheet.blocks,
    cashFlowStatement: data.cashFlowStatement.blocks,
    companyName: data.meta.companyName || "",
    currency: data.meta.currency,
    period, // Return period as a direct field
    meta: data.meta,
  }
}

/**
 * Create an empty financial statement structure
 * @returns Empty FinancialStatementJSON object
 */
export function createEmptyFinancialStatement(): FinancialStatementJSON {
  return {
    incomeStatement: { blocks: [] },
    balanceSheet: { blocks: [] },
    cashFlowStatement: { blocks: [] },
    meta: {
      companyName: "",
      currency: "USD",
      period: "",
      timestamp: new Date().toISOString(),
      version: "1.0",
    },
  }
}

/**
 * Validate individual row structure
 * @param row - The row to validate
 * @returns True if valid, false otherwise
 */
export function validateRow(row: any): row is Row {
  if (!row || !row.id || !row.type) return false

  switch (row.type) {
    case "title":
      return typeof row.title === "string"
    case "number":
      return typeof row.attr === "string" && typeof row.value === "number"
    case "total":
      return typeof row.totalTitle === "string" && Array.isArray(row.sources)
    default:
      return false
  }
}

/**
 * Validate section structure
 * @param section - The section to validate
 * @returns True if valid, false otherwise
 */
export function validateSection(section: any): section is Section {
  if (!section || !section.id || !section.title || !Array.isArray(section.rows)) {
    return false
  }

  // Validate title row
  if (!validateRow(section.title) || section.title.type !== "title") {
    return false
  }

  // Validate all rows
  return section.rows.every(validateRow)
}

/**
 * Sanitize and repair financial statement data
 * Attempts to fix common issues in saved data
 * @param data - The data to sanitize
 * @returns Sanitized data or null if unrepairable
 */
export function sanitizeFinancialStatementData(data: any): FinancialStatementJSON | null {
  if (!data || typeof data !== "object") return null

  try {
    // Ensure all required top-level properties exist
    const sanitized: FinancialStatementJSON = {
      incomeStatement: data.incomeStatement || { blocks: [] },
      balanceSheet: data.balanceSheet || { blocks: [] },
      cashFlowStatement: data.cashFlowStatement || { blocks: [] },
      meta: {
        companyName: data.meta?.companyName || "",
        currency: data.meta?.currency || "USD",
        period: data.meta?.period || "",
        timestamp: data.meta?.timestamp || new Date().toISOString(),
        version: data.meta?.version || "1.0",
      },
    }

    // Sanitize each statement's blocks
    const statements: StatementType[] = ["incomeStatement", "balanceSheet", "cashFlowStatement"]
    for (const statementType of statements) {
      const statement = sanitized[statementType]
      if (!Array.isArray(statement.blocks)) {
        statement.blocks = []
      }

      // Filter out invalid sections
      statement.blocks = statement.blocks.filter((section: any) => {
        if (!section || !section.id) return false

        // Ensure title exists
        if (!section.title || typeof section.title !== "object") {
          section.title = { id: `${section.id}_title`, type: "title", title: "Untitled" }
        }

        // Ensure rows is an array
        if (!Array.isArray(section.rows)) {
          section.rows = []
        }

        // Filter out invalid rows
        section.rows = section.rows.filter(validateRow)

        return true
      })
    }

    return sanitized
  } catch (error) {
    console.error("[Financial Statement Helper] Failed to sanitize data:", error)
    return null
  }
}

/**
 * Get a summary of the financial statement data
 * @param data - The FinancialStatementJSON object
 * @returns Summary object with counts and metadata
 */
export function getFinancialStatementSummary(data: FinancialStatementJSON) {
  return {
    currency: data.meta.currency,
    period: data.meta.period,
    timestamp: data.meta.timestamp,
    version: data.meta.version,
    incomeStatementSections: data.incomeStatement.blocks.length,
    balanceSheetSections: data.balanceSheet.blocks.length,
    cashFlowStatementSections: data.cashFlowStatement.blocks.length,
    totalSections:
      data.incomeStatement.blocks.length + data.balanceSheet.blocks.length + data.cashFlowStatement.blocks.length,
  }
}

/**
 * Transform identifiers in the financial statement data
 * Used to switch between projectId (frontend) and slug (backend) prefixes
 * @param data - The FinancialStatementJSON object
 * @param fromPrefix - The prefix to replace (e.g., "slug" or "projectId")
 * @param toPrefix - The new prefix to use
 * @returns Transformed FinancialStatementJSON object
 */
export function transformIdentifiers(
  data: FinancialStatementJSON,
  fromPrefix: string,
  toPrefix: string,
): FinancialStatementJSON {
  if (!fromPrefix || !toPrefix) return data

  // Deep clone to avoid mutating original
  const newData = JSON.parse(JSON.stringify(data))

  const processRows = (rows: any[]) => {
    for (const row of rows) {
      if (row.type === "number" && row.attr && typeof row.attr === "string") {
        // Check if attr starts with "fromPrefix:"
        if (row.attr.startsWith(fromPrefix + ":")) {
          row.attr = row.attr.replace(fromPrefix + ":", toPrefix + ":")
        }
      }
    }
  }

  // Process all statements
  const statements: StatementType[] = ["incomeStatement", "balanceSheet", "cashFlowStatement"]
  for (const type of statements) {
    if (newData[type] && newData[type].blocks) {
      newData[type].blocks.forEach((section: any) => {
        if (section.rows) processRows(section.rows)
      })
    }
  }

  return newData
}
