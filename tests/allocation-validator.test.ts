/**
 * Allocation Builder Validator Tests
 *
 * Run with: npx vitest run app/docs/_tests/allocation-validator.test.ts
 *
 * CRITICAL: These tests use PRODUCTION helpers to ensure docs behavior
 * matches production exactly. Tests only validate what production validates:
 * - textExplanation is string
 * - supplyAllocation.categories is array
 * - supplyAllocation.totalSupply is number
 * - supplyAllocation.tokenTicker is string
 * - vestingSchedule.dataPoints is array
 * - vestingSchedule.categories is array
 * - meta.version is string
 */

import { describe, it, expect } from "vitest"
import { validateAllocation } from "@/lib/validators"

describe("validateAllocation", () => {
  // Helper to create valid allocation data
  const createValidAllocation = (overrides = {}) => ({
    textExplanation: "Token distribution overview",
    supplyAllocation: {
      categories: [
        { id: "cat-1", label: "Team", tokenAmount: 200000000, percentage: 20, color: "#3B82F6" },
        { id: "cat-2", label: "Community", tokenAmount: 500000000, percentage: 50, color: "#10B981" },
        { id: "cat-3", label: "Treasury", tokenAmount: 300000000, percentage: 30, color: "#8B5CF6" }
      ],
      totalSupply: 1000000000,
      tokenTicker: "TKN"
    },
    vestingSchedule: {
      dataPoints: [
        {
          quarterLabel: "Q1 2025",
          timestamp: "2025-01-01T00:00:00Z",
          categories: { "Team": 0, "Community": 100000000, "Treasury": 50000000 }
        },
        {
          quarterLabel: "Q2 2025",
          timestamp: "2025-04-01T00:00:00Z",
          categories: { "Team": 50000000, "Community": 200000000, "Treasury": 100000000 }
        }
      ],
      categories: ["Team", "Community", "Treasury"],
      colors: {
        "Team": "#3B82F6",
        "Community": "#10B981",
        "Treasury": "#8B5CF6"
      }
    },
    meta: {
      version: "1.0",
      timestamp: "2025-01-15T00:00:00Z"
    },
    ...overrides
  })

  describe("valid inputs", () => {
    it("should accept valid allocation data", () => {
      const input = JSON.stringify(createValidAllocation())
      const result = validateAllocation(input)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.parsedData).toBeDefined()
    })

    it("should accept allocation with single category", () => {
      const data = {
        textExplanation: "Simple allocation",
        supplyAllocation: {
          categories: [
            { id: "cat-1", label: "Community", tokenAmount: 1000000000, percentage: 100, color: "#10B981" }
          ],
          totalSupply: 1000000000,
          tokenTicker: "TKN"
        },
        vestingSchedule: {
          dataPoints: [],
          categories: ["Community"],
          colors: { "Community": "#10B981" }
        },
        meta: {
          version: "1.0"
        }
      }
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept allocation with many categories", () => {
      const categories = [
        { id: "cat-1", label: "Team", tokenAmount: 100000000, percentage: 10, color: "#3B82F6" },
        { id: "cat-2", label: "Investors", tokenAmount: 150000000, percentage: 15, color: "#10B981" },
        { id: "cat-3", label: "Community", tokenAmount: 300000000, percentage: 30, color: "#8B5CF6" },
        { id: "cat-4", label: "Treasury", tokenAmount: 200000000, percentage: 20, color: "#EF4444" },
        { id: "cat-5", label: "Ecosystem", tokenAmount: 250000000, percentage: 25, color: "#F59E0B" }
      ]
      const data = {
        textExplanation: "Complex allocation",
        supplyAllocation: {
          categories,
          totalSupply: 1000000000,
          tokenTicker: "TKN"
        },
        vestingSchedule: {
          dataPoints: [],
          categories: categories.map(c => c.label),
          colors: Object.fromEntries(categories.map(c => [c.label, c.color]))
        },
        meta: {
          version: "1.0"
        }
      }
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept empty categories array", () => {
      const data = {
        textExplanation: "Empty allocation",
        supplyAllocation: {
          categories: [],
          totalSupply: 0,
          tokenTicker: "TKN"
        },
        vestingSchedule: {
          dataPoints: [],
          categories: [],
          colors: {}
        },
        meta: {
          version: "1.0"
        }
      }
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })

    it("should accept empty textExplanation", () => {
      const data = createValidAllocation({ textExplanation: "" })
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(true)
    })
  })

  describe("invalid inputs", () => {
    it("should reject empty string", () => {
      const result = validateAllocation("")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it("should reject invalid JSON", () => {
      const result = validateAllocation("{invalid json}")
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.field === "json")).toBe(true)
    })

    it("should reject missing supplyAllocation", () => {
      const data = {
        textExplanation: "Test",
        vestingSchedule: { dataPoints: [], categories: [], colors: {} },
        meta: { version: "1.0" }
      }
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing vestingSchedule", () => {
      const data = {
        textExplanation: "Test",
        supplyAllocation: {
          categories: [{ id: "cat-1", label: "All", tokenAmount: 1000, percentage: 100, color: "#3B82F6" }],
          totalSupply: 1000,
          tokenTicker: "TKN"
        },
        meta: { version: "1.0" }
      }
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing textExplanation", () => {
      const data = createValidAllocation()
      delete (data as any).textExplanation
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing meta", () => {
      const data = createValidAllocation()
      delete (data as any).meta
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing meta.version", () => {
      const data = createValidAllocation()
      delete (data as any).meta.version
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing totalSupply", () => {
      const data = createValidAllocation()
      delete (data as any).supplyAllocation.totalSupply
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject missing tokenTicker", () => {
      const data = createValidAllocation()
      delete (data as any).supplyAllocation.tokenTicker
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-array categories", () => {
      const data = createValidAllocation()
      ;(data as any).supplyAllocation.categories = "not an array"
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-array vestingSchedule.dataPoints", () => {
      const data = createValidAllocation()
      ;(data as any).vestingSchedule.dataPoints = "not an array"
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-array vestingSchedule.categories", () => {
      const data = createValidAllocation()
      ;(data as any).vestingSchedule.categories = "not an array"
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-string textExplanation", () => {
      const data = createValidAllocation()
      ;(data as any).textExplanation = 123
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-number totalSupply", () => {
      const data = createValidAllocation()
      ;(data as any).supplyAllocation.totalSupply = "1000000"
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-string tokenTicker", () => {
      const data = createValidAllocation()
      ;(data as any).supplyAllocation.tokenTicker = 123
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })

    it("should reject non-string meta.version", () => {
      const data = createValidAllocation()
      ;(data as any).meta.version = 1.0
      const result = validateAllocation(JSON.stringify(data))
      expect(result.valid).toBe(false)
    })
  })

  describe("structure preservation", () => {
    it("should preserve all fields in parsedData", () => {
      const input = createValidAllocation()
      const result = validateAllocation(JSON.stringify(input))
      expect(result.valid).toBe(true)
      expect(result.parsedData?.supplyAllocation.categories).toHaveLength(3)
      expect(result.parsedData?.supplyAllocation.tokenTicker).toBe("TKN")
      expect(result.parsedData?.supplyAllocation.totalSupply).toBe(1000000000)
      expect(result.parsedData?.vestingSchedule.dataPoints).toHaveLength(2)
    })

    it("should preserve category details", () => {
      const input = createValidAllocation()
      const result = validateAllocation(JSON.stringify(input))
      expect(result.valid).toBe(true)
      const firstCategory = result.parsedData?.supplyAllocation.categories[0]
      expect(firstCategory?.label).toBe("Team")
      expect(firstCategory?.tokenAmount).toBe(200000000)
      expect(firstCategory?.percentage).toBe(20)
      expect(firstCategory?.color).toBe("#3B82F6")
    })
  })
})
