/**
 * B1 TGE Filing Integration Tests
 *
 * Run with: npx vitest run app/docs/_tests/b1-filing.test.ts
 */

import { describe, it, expect } from "vitest"
import { parseCsv } from "@/lib/csv-ingress/parser"
import { validateByType } from "@/lib/validators"
import { B1_QUESTIONS, getQuestionByOrder } from "@/data/b1-questions"

describe("B1 TGE Filing", () => {
  // Helper to create valid allocation JSON (matches production helper requirements)
  const createValidAllocationJson = () => JSON.stringify({
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
        { quarterLabel: "Q1 2025", timestamp: "2025-01-01T00:00:00Z", categories: { "Team": 0, "Community": 100000000, "Treasury": 50000000 } }
      ],
      categories: ["Team", "Community", "Treasury"],
      colors: { "Team": "#3B82F6", "Community": "#10B981", "Treasury": "#8B5CF6" }
    },
    meta: {
      version: "1.0",
      timestamp: "2025-01-15T00:00:00Z"
    }
  })

  // Helper to create a complete B1 filing CSV
  const createCompleteCsv = (overrides: Record<number, string> = {}) => {
    const answers: Record<number, string> = {
      1: "**Project Overview**\\n\\nOur protocol enables decentralized trading with low fees.",
      2: "| Name | Title | Experience |\\n| --- | --- |\\n| John Doe | CEO | 10 years in DeFi |",
      3: "The DAO structure includes governance token holders with voting rights.",
      4: "Primary Foundation: Cayman Islands. DevCo: Delaware C-Corp.",
      5: createValidAllocationJson(),
      6: "Airdrop will target early users and liquidity providers.",
      7: "| Market Maker | Allocation | Term | Structure |\\n| --- | --- | --- | --- |\\n| MM1 | 2% | 12 months | Loan |",
      8: "| Exchange | Allocation | Term | Fees |\\n| --- | --- | --- | --- |\\n| CEX1 | 1% | 6 months | None |",
      9: "| Series | Date | Tokens | Vesting |\\n| --- | --- | --- | --- |\\n| Seed | 2023-01 | 10% | 2 years |",
      10: "No prior exploits have affected the protocol.",
      11: "**Risk Factors**\\n\\n- Regulatory uncertainty\\n- Smart contract risks",
      ...overrides
    }

    const rows = Object.entries(answers)
      .map(([order, text]) => `${order},"${text.replace(/"/g, '""')}"`)
      .join("\n")

    return `order,answerText\n${rows}`
  }

  describe("CSV Parsing", () => {
    it("should parse complete B1 filing CSV", () => {
      const csv = createCompleteCsv()
      const result = parseCsv(csv)

      expect(result.errors).toHaveLength(0)
      expect(result.rows).toHaveLength(11)
      expect(result.rows.map(r => r.order).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    })

    it("should parse B1 filing with required questions only (no Q11)", () => {
      const answers: Record<number, string> = {}
      for (let i = 1; i <= 10; i++) {
        answers[i] = i === 5 ? createValidAllocationJson() : `Answer for question ${i}`
      }
      const rows = Object.entries(answers)
        .map(([order, text]) => `${order},"${text.replace(/"/g, '""')}"`)
        .join("\n")
      const csv = `order,answerText\n${rows}`

      const result = parseCsv(csv)
      expect(result.errors).toHaveLength(0)
      expect(result.rows).toHaveLength(10)
    })

    it("should handle escaped quotes in CSV", () => {
      const csv = `order,answerText\n1,"This has ""quoted"" text"`
      const result = parseCsv(csv)

      expect(result.errors).toHaveLength(0)
      expect(result.rows[0].answerText).toBe('This has "quoted" text')
    })

    it("should handle newlines in quoted fields", () => {
      const csv = `order,answerText\n1,"Line 1\nLine 2\nLine 3"`
      const result = parseCsv(csv)

      expect(result.errors).toHaveLength(0)
      expect(result.rows[0].answerText).toContain("Line 1")
      expect(result.rows[0].answerText).toContain("Line 2")
    })

    it("should handle JSON with nested quotes", () => {
      const json = JSON.stringify({ key: "value with \"quotes\"" })
      const csv = `order,answerText\n5,"${json.replace(/"/g, '""')}"`
      const result = parseCsv(csv)

      expect(result.errors).toHaveLength(0)
      expect(() => JSON.parse(result.rows[0].answerText)).not.toThrow()
    })
  })

  describe("Question Type Validation", () => {
    it("should validate Q1-4 as text type", () => {
      for (let order = 1; order <= 4; order++) {
        const question = getQuestionByOrder(order)
        expect(question?.questionType).toBe("text")

        const result = validateByType("Valid text content with **markdown**", "text")
        expect(result.valid).toBe(true)
      }
    })

    it("should validate Q5 as allocation-builder type", () => {
      const question = getQuestionByOrder(5)
      expect(question?.questionType).toBe("allocation-builder")

      const result = validateByType(createValidAllocationJson(), "allocation-builder")
      expect(result.valid).toBe(true)
    })

    it("should validate Q6-11 as text type", () => {
      for (let order = 6; order <= 11; order++) {
        const question = getQuestionByOrder(order)
        expect(question?.questionType).toBe("text")

        const result = validateByType("Valid text content", "text")
        expect(result.valid).toBe(true)
      }
    })

    it("should fail Q5 with invalid allocation JSON", () => {
      const invalidAllocation = JSON.stringify({
        supplyAllocation: {
          categories: [
            { id: "cat-1", label: "All", tokenAmount: 500, percentage: 50, color: "#3B82F6" }
          ],
          totalSupply: 1000,
          tokenTicker: "TKN"
        }
        // Missing vestingSchedule
      })

      const result = validateByType(invalidAllocation, "allocation-builder")
      expect(result.valid).toBe(false)
    })

    it("should fail Q5 with plain text instead of JSON", () => {
      const result = validateByType("This is just text, not JSON", "allocation-builder")
      expect(result.valid).toBe(false)
    })
  })

  describe("Required vs Optional Questions", () => {
    it("should have 10 required questions", () => {
      const required = B1_QUESTIONS.filter(q => q.required)
      expect(required).toHaveLength(10)
    })

    it("should have Q11 as optional", () => {
      const q11 = getQuestionByOrder(11)
      expect(q11?.required).toBe(false)
    })

    it("should have Q1-10 as required", () => {
      for (let order = 1; order <= 10; order++) {
        const question = getQuestionByOrder(order)
        expect(question?.required).toBe(true)
      }
    })
  })

  describe("Full Filing Validation", () => {
    it("should validate complete B1 filing", () => {
      const csv = createCompleteCsv()
      const parseResult = parseCsv(csv)
      expect(parseResult.errors).toHaveLength(0)

      // Validate each row
      const validations = parseResult.rows.map(row => {
        const question = getQuestionByOrder(row.order)
        if (!question) return { order: row.order, valid: false, error: "Unknown question" }

        const validation = validateByType(row.answerText, question.questionType)
        return { order: row.order, valid: validation.valid, errors: validation.errors }
      })

      const allValid = validations.every(v => v.valid)
      expect(allValid).toBe(true)
    })

    it("should identify invalid questions in filing", () => {
      const csv = createCompleteCsv({
        5: "This is not valid JSON for allocation" // Invalid Q5
      })

      const parseResult = parseCsv(csv)
      const row5 = parseResult.rows.find(r => r.order === 5)
      expect(row5).toBeDefined()

      const q5 = getQuestionByOrder(5)
      const validation = validateByType(row5!.answerText, q5!.questionType)
      expect(validation.valid).toBe(false)
    })

    it("should detect missing required questions", () => {
      // CSV with only Q1-3
      const csv = `order,answerText
1,"Answer 1"
2,"Answer 2"
3,"Answer 3"`

      const parseResult = parseCsv(csv)
      const presentOrders = new Set(parseResult.rows.map(r => r.order))

      const missingRequired = B1_QUESTIONS
        .filter(q => q.required && !presentOrders.has(q.order))
        .map(q => q.order)

      expect(missingRequired).toContain(4)
      expect(missingRequired).toContain(5)
      expect(missingRequired).toContain(6)
      expect(missingRequired).toContain(7)
      expect(missingRequired).toContain(8)
      expect(missingRequired).toContain(9)
      expect(missingRequired).toContain(10)
    })

    it("should allow missing optional Q11", () => {
      // Create CSV with Q1-10 only
      const answers: Record<number, string> = {}
      for (let i = 1; i <= 10; i++) {
        answers[i] = i === 5 ? createValidAllocationJson() : `Answer for question ${i}`
      }
      const rows = Object.entries(answers)
        .map(([order, text]) => `${order},"${text.replace(/"/g, '""')}"`)
        .join("\n")
      const csv = `order,answerText\n${rows}`

      const parseResult = parseCsv(csv)
      const presentOrders = new Set(parseResult.rows.map(r => r.order))

      const missingRequired = B1_QUESTIONS
        .filter(q => q.required && !presentOrders.has(q.order))

      expect(missingRequired).toHaveLength(0)
      expect(presentOrders.has(11)).toBe(false) // Q11 missing but that's OK
    })
  })

  describe("B1 Question Structure", () => {
    it("should have all 11 questions defined", () => {
      expect(B1_QUESTIONS).toHaveLength(11)
    })

    it("should have correct question titles", () => {
      expect(getQuestionByOrder(1)?.title).toBe("Description of Project")
      expect(getQuestionByOrder(2)?.title).toBe("Known Project Team & Investors")
      expect(getQuestionByOrder(3)?.title).toBe("DAO Structure")
      expect(getQuestionByOrder(4)?.title).toBe("Primary Foundation and Dev Co")
      expect(getQuestionByOrder(5)?.title).toBe("Initial Allocation")
      expect(getQuestionByOrder(6)?.title).toBe("Airdrop Process")
      expect(getQuestionByOrder(7)?.title).toBe("Market Maker Agreements & Deals")
      expect(getQuestionByOrder(8)?.title).toBe("CEX / DEX Agreements & Deals")
      expect(getQuestionByOrder(9)?.title).toBe("Prior Token Sales & Fundraising")
      expect(getQuestionByOrder(10)?.title).toBe("Previous Exploits Affecting The Project")
      expect(getQuestionByOrder(11)?.title).toBe("[OPTIONAL] Material Risk Factors")
    })

    it("should have correct sections assigned", () => {
      expect(getQuestionByOrder(1)?.section).toBe("Project & Team")
      expect(getQuestionByOrder(5)?.section).toBe("Token Supply & Allocations")
      expect(getQuestionByOrder(7)?.section).toBe("Transactions & Market Structures")
      expect(getQuestionByOrder(10)?.section).toBe("Financial Disclosures & Risks")
    })

    it("should have instructions for all questions", () => {
      for (const question of B1_QUESTIONS) {
        expect(question.instructions).toBeDefined()
        expect(question.instructions.length).toBeGreaterThan(50)
      }
    })
  })

  describe("Edge Cases", () => {
    it("should handle out-of-order CSV rows", () => {
      const csv = `order,answerText
5,"${createValidAllocationJson().replace(/"/g, '""')}"
1,"Answer 1"
10,"Answer 10"
3,"Answer 3"`

      const result = parseCsv(csv)
      expect(result.errors).toHaveLength(0)
      expect(result.rows).toHaveLength(4)
    })

    it("should handle extra columns in CSV", () => {
      const csv = `order,answerText,extraColumn
1,"Answer 1","ignored"`

      const result = parseCsv(csv)
      expect(result.errors).toHaveLength(0)
      expect(result.rows[0].answerText).toBe("Answer 1")
    })

    it("should warn on empty answerText", () => {
      const csv = `order,answerText
1,""`

      const result = parseCsv(csv)
      expect(result.warnings.length).toBeGreaterThan(0)
    })

    it("should handle unicode content", () => {
      const csv = `order,answerText
1,"プロジェクト概要 🚀 émojis and spëcial çharacters"`

      const result = parseCsv(csv)
      expect(result.errors).toHaveLength(0)
      expect(result.rows[0].answerText).toContain("プロジェクト")
      expect(result.rows[0].answerText).toContain("🚀")
    })

    it("should handle very long content", () => {
      const longText = "A".repeat(100000)
      const csv = `order,answerText
1,"${longText}"`

      const result = parseCsv(csv)
      expect(result.errors).toHaveLength(0)
      expect(result.rows[0].answerText.length).toBe(100000)
    })
  })
})
