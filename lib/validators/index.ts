/**
 * Unified Validators for Docs
 *
 * CRITICAL: These validators wrap PRODUCTION helpers to ensure
 * the docs test environment matches production behavior exactly.
 */

import type { QuestionType, ValidationResult, ValidationError } from "@/lib/csv-ingress/types"
import { parseCsvField } from "./csv-utils"

// Re-export parseCsvField for use by other validators
export { parseCsvField }

// Import production helpers (using relative paths for better test compatibility)
import { parseWalletJSON, validateWallet as validateWalletStructure } from "@/lib/wallet/wallet-manager-helpers"
import { parseAllocationBuilderJSON, validateAllocationBuilderJSON } from "@/lib/allocation/allocation-builder-helpers"
import { parseFinancialStatementJSON, validateFinancialStatementJSON } from "@/lib/financial/financial-statement-helpers"

// Import types from production
import type { Wallet } from "@/types/index"
import type { AllocationBuilderJSON, AllocationCategory, VestingDataPoint } from "@/types/financial/allocation-builder"
import type { FinancialStatementJSON, Section, Row } from "@/types/financial/financial-statements"

// Re-export types for use in components
export type { Wallet as ParsedWallet }
export type { AllocationBuilderJSON as AllocationBuilderData, AllocationCategory, VestingDataPoint }
export type { FinancialStatementJSON as FinancialStatementData, Section, Row }

// Import custom validators for types without production helpers
import { validateText as validateTextImpl, markdownToHtml as markdownToHtmlImpl } from "./text-validator"
import { validateFlowchart as validateFlowchartImpl } from "./flowchart-validator"

// Re-export custom validators
export { validateText, markdownToHtml, type TextValidationResult } from "./text-validator"
export { validateFlowchart, type FlowchartValidationResult, type FlowchartData, type FlowchartNode, type FlowchartConnection } from "./flowchart-validator"

// Extended result types
export interface WalletValidationResult extends ValidationResult {
  parsedData?: Wallet[]
}

export interface AllocationValidationResult extends ValidationResult {
  parsedData?: AllocationBuilderJSON
}

export interface FinancialValidationResult extends ValidationResult {
  parsedData?: FinancialStatementJSON
}

/**
 * Validate wallet JSON using production helper
 */
export function validateWallet(answerText: string): WalletValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for empty content
  if (!answerText || answerText.trim().length === 0) {
    errors.push({
      field: "answerText",
      message: "Wallet data cannot be empty",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Parse CSV field escaping (handles "" -> " and removes outer quotes)
  const jsonText = parseCsvField(answerText)

  // Use production parser
  const wallets = parseWalletJSON(jsonText)

  if (wallets === null) {
    errors.push({
      field: "json",
      message: "Invalid JSON format. Expected object with wallet titles as keys.",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  if (wallets.length === 0) {
    errors.push({
      field: "wallets",
      message: "At least one wallet is required",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Validate each wallet using production validator
  wallets.forEach((wallet, index) => {
    if (!validateWalletStructure(wallet)) {
      errors.push({
        field: `wallet[${index}]`,
        message: `Invalid wallet structure at index ${index}`,
        severity: "error"
      })
    }

    // Check required fields
    if (!wallet.title?.trim()) {
      errors.push({
        field: `wallet[${index}].title`,
        message: `Wallet at index ${index} is missing title`,
        severity: "error"
      })
    }
    if (!wallet.address?.trim()) {
      errors.push({
        field: `wallet[${index}].address`,
        message: `Wallet "${wallet.title || index}" is missing address`,
        severity: "error"
      })
    }
    if (!wallet.chain?.trim()) {
      errors.push({
        field: `wallet[${index}].chain`,
        message: `Wallet "${wallet.title || index}" is missing chain`,
        severity: "error"
      })
    }
  })

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    parsedData: errors.length === 0 ? wallets : undefined
  }
}

/**
 * Validate allocation builder JSON using production helper
 */
export function validateAllocation(answerText: string): AllocationValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for empty content
  if (!answerText || answerText.trim().length === 0) {
    errors.push({
      field: "answerText",
      message: "Allocation data cannot be empty",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Parse CSV field escaping (handles "" -> " and removes outer quotes)
  const jsonText = parseCsvField(answerText)

  // Use production parser
  const data = parseAllocationBuilderJSON(jsonText)

  if (data === null) {
    errors.push({
      field: "json",
      message: "Invalid JSON format or missing required fields for allocation builder",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Production validator already checks structure
  if (!validateAllocationBuilderJSON(data)) {
    errors.push({
      field: "structure",
      message: "Allocation data structure is invalid",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    parsedData: errors.length === 0 ? data : undefined
  }
}

/**
 * Validate financial statement JSON using production helper
 */
export function validateFinancial(answerText: string): FinancialValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for empty content
  if (!answerText || answerText.trim().length === 0) {
    errors.push({
      field: "answerText",
      message: "Financial statement data cannot be empty",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Parse CSV field escaping (handles "" -> " and removes outer quotes)
  const jsonText = parseCsvField(answerText)

  // Use production parser
  const data = parseFinancialStatementJSON(jsonText)

  if (data === null) {
    errors.push({
      field: "json",
      message: "Invalid JSON format or missing required fields for financial statement",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Production validator already checks structure
  if (!validateFinancialStatementJSON(data)) {
    errors.push({
      field: "structure",
      message: "Financial statement data structure is invalid",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    parsedData: errors.length === 0 ? data : undefined
  }
}

/**
 * Validate answer text based on question type
 * Uses production helpers for wallet, allocation, and financial
 */
export function validateByType(answerText: string, questionType: QuestionType): ValidationResult {
  switch (questionType) {
    case "text":
      return validateTextImpl(answerText)
    case "wallet":
      return validateWallet(answerText)
    case "flowchart":
      return validateFlowchartImpl(answerText)
    case "allocation-builder":
      return validateAllocation(answerText)
    case "financial":
      return validateFinancial(answerText)
    default:
      return {
        valid: false,
        errors: [{ field: "questionType", message: `Unknown question type: ${questionType}`, severity: "error" }],
        warnings: []
      }
  }
}
