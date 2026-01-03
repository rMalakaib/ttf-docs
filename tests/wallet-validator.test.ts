/**
 * Wallet Validator Tests
 *
 * Run with: npx vitest run app/docs/_tests/wallet-validator.test.ts
 *
 * CRITICAL: These tests use PRODUCTION helpers to ensure docs behavior
 * matches production exactly. Tests only validate what production validates.
 */

import { describe, it, expect } from "vitest"
import { validateWallet } from "@/lib/validators"

describe("validateWallet", () => {
  describe("valid inputs", () => {
    it("should accept valid wallet with all fields", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury wallet",
          address: "0x1234567890abcdef1234567890abcdef12345678",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.parsedData).toBeDefined()
    })

    it("should accept wallet with Solana-style address", () => {
      const input = JSON.stringify({
        "Staking Rewards": {
          description: "Staking reward distribution wallet",
          address: "7nYBqPqCAuuSNUpGN3ZFhJ9h5s6N8bKfLp1xP3nZwWvz",
          chain: "solana"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it("should accept multiple wallets", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury",
          address: "0x1234567890abcdef1234567890abcdef12345678",
          chain: "ethereum"
        },
        "Operations": {
          description: "Operational funds",
          address: "0xabcdef1234567890abcdef1234567890abcdef12",
          chain: "ethereum"
        },
        "Solana Treasury": {
          description: "Solana treasury",
          address: "7nYBqPqCAuuSNUpGN3ZFhJ9h5s6N8bKfLp1xP3nZwWvz",
          chain: "solana"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
      expect(result.parsedData).toHaveLength(3)
    })

    it("should accept wallet with any chain value", () => {
      const input = JSON.stringify({
        "Custom Chain Wallet": {
          description: "Wallet on custom chain",
          address: "custom-address-format",
          chain: "custom-chain"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
    })

    it("should accept wallet with any address format", () => {
      const input = JSON.stringify({
        "Generic Wallet": {
          description: "Generic wallet",
          address: "any-valid-address-string",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
    })
  })

  describe("invalid inputs", () => {
    it("should reject empty string", () => {
      const result = validateWallet("")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it("should reject invalid JSON", () => {
      const result = validateWallet("{invalid json}")
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.field === "json")).toBe(true)
    })

    it("should reject empty wallets object", () => {
      const input = JSON.stringify({})
      const result = validateWallet(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("At least one wallet"))).toBe(true)
    })

    it("should reject wallet missing address", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("address"))).toBe(true)
    })

    it("should reject wallet missing chain", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury",
          address: "0x1234567890abcdef1234567890abcdef12345678"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("chain"))).toBe(true)
    })

    it("should reject wallet with empty address", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury",
          address: "",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("address"))).toBe(true)
    })

    it("should reject wallet with empty chain", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury",
          address: "0x1234567890abcdef1234567890abcdef12345678",
          chain: ""
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("chain"))).toBe(true)
    })

    it("should reject wallet with whitespace-only chain", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "Main treasury",
          address: "0x1234567890abcdef1234567890abcdef12345678",
          chain: "   "
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("chain"))).toBe(true)
    })
  })

  describe("wallet structure", () => {
    it("should parse wallet title from JSON key", () => {
      const input = JSON.stringify({
        "My Treasury Wallet": {
          description: "Treasury",
          address: "0x123",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
      expect(result.parsedData?.[0].title).toBe("My Treasury Wallet")
    })

    it("should preserve description field", () => {
      const input = JSON.stringify({
        "Treasury": {
          description: "This is a detailed description",
          address: "0x123",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
      expect(result.parsedData?.[0].description).toBe("This is a detailed description")
    })

    it("should generate unique IDs for each wallet", () => {
      const input = JSON.stringify({
        "Wallet 1": {
          description: "First",
          address: "0x111",
          chain: "ethereum"
        },
        "Wallet 2": {
          description: "Second",
          address: "0x222",
          chain: "ethereum"
        }
      })
      const result = validateWallet(input)
      expect(result.valid).toBe(true)
      expect(result.parsedData?.[0].id).toBeDefined()
      expect(result.parsedData?.[1].id).toBeDefined()
      expect(result.parsedData?.[0].id).not.toBe(result.parsedData?.[1].id)
    })
  })
})
