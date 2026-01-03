// Types for CSV ingress feature

export interface CsvRow {
  order: number
  answerText: string
}

export interface ParsedCsvResult {
  rows: CsvRow[]
  errors: string[]
  warnings: string[]
}

export interface ImportedAnswer {
  order: number
  questionId: string
  answerText: string
}

export interface FailedImport {
  order: number
  answerText: string
  error: string
}

export interface CsvIngresResult {
  success: boolean
  imported: ImportedAnswer[]
  failed: FailedImport[]
  totalRows: number
}

// Validation result types
export interface ValidationError {
  field: string
  message: string
  severity: "error" | "warning"
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
  parsedData?: unknown
}

// Question types
export type QuestionType = "text" | "wallet" | "flowchart" | "allocation-builder" | "financial"
