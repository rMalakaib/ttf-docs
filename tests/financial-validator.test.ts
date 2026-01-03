/**
 * Financial Statement Validator Tests
 *
 * Run with: npx vitest run app/docs/_tests/financial-validator.test.ts
 *
 * CRITICAL: These tests use PRODUCTION helpers to ensure docs behavior
 * matches production exactly. Tests only validate what production validates:
 * - incomeStatement, balanceSheet, cashFlowStatement exist
 * - Each statement has a blocks array
 * - meta.currency, meta.timestamp, meta.version exist
 * - Note: period is optional in meta
 */

import { describe, it, expect } from "vitest"
import { validateFinancial } from "@/lib/validators"

describe("validateFinancial", () => {
  // Helper to create valid financial data
  const createValidFinancial = (overrides = {}) => ({
    incomeStatement: {
      blocks: [
        {
          id: "sec-revenue",
          title: { id: "title-revenue", type: "title", title: "Revenue" },
          rows: [
            { id: "row-1", type: "number", attr: "Revenue", value: 5000000 },
            { id: "row-2", type: "number", attr: "IS_APY_VAULTS", value: 500000 },
            { id: "total-1", type: "total", totalTitle: "IS_TOTAL_REVENUE", sources: ["row-1", "row-2"] }
          ]
        }
      ]
    },
    balanceSheet: {
      blocks: [
        {
          id: "sec-assets",
          title: { id: "title-assets", type: "title", title: "Assets" },
          rows: [
            { id: "bs-row-1", type: "number", attr: "BS_CASH_EQ", value: 10000000 },
            { id: "bs-row-2", type: "number", attr: "BS_DIGITAL_ASSETS_OFFCHAIN", value: 25000000 }
          ]
        }
      ]
    },
    cashFlowStatement: {
      blocks: [
        {
          id: "sec-operating",
          title: { id: "title-operating", type: "title", title: "Operating Activities" },
          rows: [
            { id: "cf-row-1", type: "number", attr: "CF_NI", value: 2000000 },
            { id: "cf-row-2", type: "number", attr: "CF_CASH_RECEIPTS", value: 8000000 }
          ]
        }
      ]
    },
    meta: {
      currency: "USD",
      period: "Q4 2024",
      timestamp: "2025-01-15T00:00:00Z",
      version: "1.0"
    },
    ...overrides
  })

  describe("valid inputs", () => {
    it("should accept valid financial statement data", () => {
      const input = JSON.stringify(createValidFinancial())
      const result = validateFinancial(input)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.parsedData).toBeDefined()
    })

    it("should accept financial data with empty blocks", () => {
      const data = {
        incomeStatement: { blocks: [] },
        balanceSheet: { blocks: [] },
        cashFlowStatement: { blocks: [] },
        meta: { currency: "USD", timestamp: "2025-01-15T00:00:00Z", version: "1.0" }
      }
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept financial data with multiple sections", () => {
      const data = createValidFinancial()
      data.incomeStatement.blocks.push({
        id: "sec-expenses",
        title: { id: "title-expenses", type: "title", title: "Expenses" },
        rows: [
          { id: "exp-1", type: "number", attr: "COGS", value: 1000000 },
          { id: "exp-2", type: "number", attr: "SG&A", value: 500000 }
        ]
      })
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept financial data with custom attributes", () => {
      const data = createValidFinancial()
      data.incomeStatement.blocks[0].rows.push({
        id: "custom-1",
        type: "number",
        attr: "CUSTOM_METRIC",
        value: 123456,
        isCustom: true,
        customLabel: "My Custom Metric"
      } as any)
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept negative values", () => {
      const data = createValidFinancial()
      data.incomeStatement.blocks[0].rows[0].value = -1000000
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept different currency codes", () => {
      const currencies = ["USD", "EUR", "GBP", "ETH", "BTC", "USDC"]
      for (const currency of currencies) {
        const data = createValidFinancial()
        data.meta.currency = currency
        const result = validateFinancial(JSON.stringify(data))
        expect(result.valid).toBe(true)
      }
    })

    it("should accept data with companyName in meta", () => {
      const data = createValidFinancial()
      ;(data.meta as any).companyName = "Acme Protocol"
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept data without period (optional field)", () => {
      const data = createValidFinancial()
      delete (data.meta as any).period
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })
  })

  describe("invalid inputs", () => {
    it("should reject empty string", () => {
      const result = validateFinancial("")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it("should reject invalid JSON", () => {
      const result = validateFinancial("{invalid json}")
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.field === "json")).toBe(true)
    })

    it("should reject missing incomeStatement", () => {
      const data = createValidFinancial()
      delete (data as any).incomeStatement
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing balanceSheet", () => {
      const data = createValidFinancial()
      delete (data as any).balanceSheet
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing cashFlowStatement", () => {
      const data = createValidFinancial()
      delete (data as any).cashFlowStatement
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing meta", () => {
      const data = createValidFinancial()
      delete (data as any).meta
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing meta.currency", () => {
      const data = createValidFinancial()
      delete (data.meta as any).currency
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing meta.timestamp", () => {
      const data = createValidFinancial()
      delete (data.meta as any).timestamp
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing meta.version", () => {
      const data = createValidFinancial()
      delete (data.meta as any).version
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject blocks that is not an array", () => {
      const data = createValidFinancial()
      ;(data.incomeStatement as any).blocks = "not an array"
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing blocks in balanceSheet", () => {
      const data = createValidFinancial()
      delete (data.balanceSheet as any).blocks
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing blocks in cashFlowStatement", () => {
      const data = createValidFinancial()
      delete (data.cashFlowStatement as any).blocks
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-array blocks in balanceSheet", () => {
      const data = createValidFinancial()
      ;(data.balanceSheet as any).blocks = {}
      const result = validateFinancial(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })
  })

  describe("structure preservation", () => {
    it("should preserve all fields in parsedData", () => {
      const input = createValidFinancial()
      const result = validateFinancial(JSON.stringify(input))
      expect(result.valid).toBe(true)
      expect(result.parsedData?.incomeStatement.blocks).toHaveLength(1)
      expect(result.parsedData?.balanceSheet.blocks).toHaveLength(1)
      expect(result.parsedData?.cashFlowStatement.blocks).toHaveLength(1)
      expect(result.parsedData?.meta.currency).toBe("USD")
      expect(result.parsedData?.meta.period).toBe("Q4 2024")
    })

    it("should preserve row data structure", () => {
      const input = createValidFinancial()
      const result = validateFinancial(JSON.stringify(input))
      expect(result.valid).toBe(true)
      const firstRow = result.parsedData?.incomeStatement.blocks[0].rows[0]
      expect(firstRow?.type).toBe("number")
      expect((firstRow as any)?.attr).toBe("Revenue")
      expect((firstRow as any)?.value).toBe(5000000)
    })

    it("should preserve section structure", () => {
      const input = createValidFinancial()
      const result = validateFinancial(JSON.stringify(input))
      expect(result.valid).toBe(true)
      const firstSection = result.parsedData?.incomeStatement.blocks[0]
      expect(firstSection?.id).toBe("sec-revenue")
      expect(firstSection?.title?.title).toBe("Revenue")
    })
  })
})
