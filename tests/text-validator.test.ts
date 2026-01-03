/**
 * Text Validator Tests
 *
 * Run with: npx vitest run tests/text-validator.test.ts
 */

import { describe, it, expect } from "vitest"
import { validateText, markdownToHtml } from "@/lib/validators/text-validator"

describe("validateText", () => {
  describe("valid inputs", () => {
    it("should accept plain text", () => {
      const result = validateText("Hello world")
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it("should accept text with bold formatting", () => {
      const result = validateText("This is **bold** text")
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.bold).toBe(true)
    })

    it("should accept text with italic formatting", () => {
      const result = validateText("This is *italic* text")
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.italic).toBe(true)
    })

    it("should accept text with bullet lists (actual newlines)", () => {
      const result = validateText("Items:\n- Item 1\n- Item 2\n- Item 3")
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.bulletLists).toBe(true)
    })

    it("should accept CSV-quoted text with bullet lists", () => {
      // CSV format: wrapped in outer quotes
      const result = validateText('"Items:\n- Item 1\n- Item 2\n- Item 3"')
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.bulletLists).toBe(true)
    })

    it("should accept text with tables (actual newlines)", () => {
      const result = validateText("| Column 1 | Column 2 |\n| --- | --- |\n| Data 1 | Data 2 |")
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.tables).toBe(true)
    })

    it("should accept text with line breaks (actual newlines)", () => {
      const result = validateText("Line 1\nLine 2\nLine 3")
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.lineBreaks).toBe(true)
    })

    it("should accept complex markdown (actual newlines)", () => {
      const input = `**Project Overview**

Our protocol enables *decentralized* trading.

**Key Features:**
- Low fees
- Fast transactions

| Metric | Value |
| --- | --- |
| TVL | $50M |`
      const result = validateText(input)
      expect(result.valid).toBe(true)
      expect(result.formattingDetected?.bold).toBe(true)
      expect(result.formattingDetected?.italic).toBe(true)
      expect(result.formattingDetected?.bulletLists).toBe(true)
      expect(result.formattingDetected?.tables).toBe(true)
      expect(result.formattingDetected?.lineBreaks).toBe(true)
    })
  })

  describe("invalid inputs", () => {
    it("should reject empty string", () => {
      const result = validateText("")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0].field).toBe("answerText")
    })

    it("should reject whitespace-only string", () => {
      const result = validateText("   ")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe("warnings", () => {
    it("should warn when long text has no formatting", () => {
      // Validator only warns for text > 200 characters
      const longText = "A".repeat(250)
      const result = validateText(longText)
      expect(result.valid).toBe(true)
      expect(result.warnings.some(w => w.message.includes("formatting"))).toBe(true)
    })

    it("should not warn for short unformatted text", () => {
      const result = validateText("Plain text without any formatting")
      expect(result.valid).toBe(true)
      // Short text doesn't trigger the warning
      expect(result.warnings.filter(w => w.message.includes("formatting"))).toHaveLength(0)
    })
  })
})

describe("markdownToHtml", () => {
  it("should convert bold text", () => {
    const html = markdownToHtml("**bold**")
    expect(html).toContain("<strong>bold</strong>")
  })

  it("should convert italic text", () => {
    const html = markdownToHtml("*italic*")
    expect(html).toContain("<em>italic</em>")
  })

  it("should convert bullet lists with actual newlines", () => {
    const html = markdownToHtml("Items:\n- Item 1\n- Item 2")
    expect(html).toContain("<li>")
    expect(html).toContain("Item 1")
  })

  it("should convert actual newlines to br tags", () => {
    const html = markdownToHtml("Line 1\nLine 2")
    expect(html).toContain("<br>")
  })

  it("should convert tables with actual newlines", () => {
    const html = markdownToHtml("| Col 1 | Col 2 |\n| --- | --- |\n| A | B |")
    expect(html).toContain("<table")
    expect(html).toContain("<th>")
    expect(html).toContain("<td>")
  })

  it("should handle CSV-quoted text with actual newlines", () => {
    // CSV format with outer quotes
    const html = markdownToHtml('"**Bold**\nSecond line"')
    expect(html).toContain("<strong>Bold</strong>")
    expect(html).toContain("<br>")
  })
})
