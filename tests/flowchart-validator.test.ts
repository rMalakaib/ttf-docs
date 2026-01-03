/**
 * Flowchart Validator Tests
 *
 * Run with: npx vitest run app/docs/_tests/flowchart-validator.test.ts
 */

import { describe, it, expect } from "vitest"
import { validateFlowchart } from "@/lib/validators/flowchart-validator"

describe("validateFlowchart", () => {
  describe("valid inputs", () => {
    it("should accept minimal valid flowchart with one node", () => {
      const input = JSON.stringify({
        nodes: [
          {
            id: "node-1",
            shape: "box",
            color: "#3b82f6",
            text: "Start",
            x: 100,
            y: 100,
            width: 120,
            height: 60
          }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.parsedData).toBeDefined()
    })

    it("should accept flowchart with circle nodes", () => {
      const input = JSON.stringify({
        nodes: [
          {
            id: "node-1",
            shape: "circle",
            color: "#10b981",
            text: "Decision",
            x: 100,
            y: 100,
            width: 80,
            height: 80
          }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
    })

    it("should accept flowchart with valid connections", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "Start", x: 100, y: 100, width: 120, height: 60 },
          { id: "node-2", shape: "box", color: "#10b981", text: "End", x: 300, y: 100, width: 120, height: 60 }
        ],
        connections: [
          {
            id: "conn-1",
            fromNodeId: "node-1",
            toNodeId: "node-2",
            fromSide: "right",
            toSide: "left",
            direction: "right"
          }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
      expect(result.parsedData?.connections).toHaveLength(1)
    })

    it("should accept flowchart with multiple connections", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 },
          { id: "node-2", shape: "box", color: "#10b981", text: "B", x: 300, y: 50, width: 120, height: 60 },
          { id: "node-3", shape: "box", color: "#ef4444", text: "C", x: 300, y: 150, width: 120, height: 60 }
        ],
        connections: [
          { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-2", fromSide: "right", toSide: "left", direction: "right" },
          { id: "conn-2", fromNodeId: "node-1", toNodeId: "node-3", fromSide: "right", toSide: "left", direction: "right" }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
    })

    it("should accept flowchart with bidirectional connection", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 },
          { id: "node-2", shape: "box", color: "#10b981", text: "B", x: 300, y: 100, width: 120, height: 60 }
        ],
        connections: [
          { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-2", fromSide: "right", toSide: "left", direction: "both" }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
    })

    it("should accept flowchart with meta field", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "Start", x: 100, y: 100, width: 120, height: 60 }
        ],
        connections: [],
        meta: {
          version: "1.0",
          timestamp: "2025-01-15T00:00:00.000Z"
        }
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
    })

    it("should accept all valid node colors", () => {
      const colors = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"]
      for (const color of colors) {
        const input = JSON.stringify({
          nodes: [
            { id: "node-1", shape: "box", color, text: "Test", x: 100, y: 100, width: 120, height: 60 }
          ],
          connections: []
        })
        const result = validateFlowchart(input)
        expect(result.valid).toBe(true)
      }
    })

    it("should accept all valid side values", () => {
      const sides = ["top", "right", "bottom", "left"]
      for (const fromSide of sides) {
        for (const toSide of sides) {
          const input = JSON.stringify({
            nodes: [
              { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 },
              { id: "node-2", shape: "box", color: "#10b981", text: "B", x: 300, y: 100, width: 120, height: 60 }
            ],
            connections: [
              { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-2", fromSide, toSide, direction: "right" }
            ]
          })
          const result = validateFlowchart(input)
          expect(result.valid).toBe(true)
        }
      }
    })
  })

  describe("invalid inputs", () => {
    it("should reject empty string", () => {
      const result = validateFlowchart("")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it("should reject invalid JSON", () => {
      const result = validateFlowchart("{invalid json}")
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.field === "json")).toBe(true)
    })

    it("should reject missing nodes array", () => {
      const result = validateFlowchart(JSON.stringify({ connections: [] }))
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("nodes"))).toBe(true)
    })

    it("should reject missing connections array", () => {
      const result = validateFlowchart(JSON.stringify({
        nodes: [{ id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 }]
      }))
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("connections"))).toBe(true)
    })

    it("should reject node missing id", () => {
      const input = JSON.stringify({
        nodes: [
          { shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("id"))).toBe(true)
    })

    it("should reject node with invalid shape", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "triangle", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("shape"))).toBe(true)
    })

    it("should reject node missing position", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", width: 120, height: 60 }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("x") || e.message.includes("y"))).toBe(true)
    })

    it("should reject node missing dimensions", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100 }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("width") || e.message.includes("height"))).toBe(true)
    })

    it("should reject connection referencing non-existent fromNodeId", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 }
        ],
        connections: [
          { id: "conn-1", fromNodeId: "node-999", toNodeId: "node-1", fromSide: "right", toSide: "left", direction: "right" }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("node-999"))).toBe(true)
    })

    it("should reject connection referencing non-existent toNodeId", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 }
        ],
        connections: [
          { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-999", fromSide: "right", toSide: "left", direction: "right" }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("node-999"))).toBe(true)
    })

    it("should reject connection with invalid fromSide", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 },
          { id: "node-2", shape: "box", color: "#10b981", text: "B", x: 300, y: 100, width: 120, height: 60 }
        ],
        connections: [
          { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-2", fromSide: "middle", toSide: "left", direction: "right" }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("fromSide"))).toBe(true)
    })

    it("should reject connection with invalid direction", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 },
          { id: "node-2", shape: "box", color: "#10b981", text: "B", x: 300, y: 100, width: 120, height: 60 }
        ],
        connections: [
          { id: "conn-1", fromNodeId: "node-1", toNodeId: "node-2", fromSide: "right", toSide: "left", direction: "up" }
        ]
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("direction"))).toBe(true)
    })

    it("should reject duplicate node ids", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#3b82f6", text: "A", x: 100, y: 100, width: 120, height: 60 },
          { id: "node-1", shape: "box", color: "#10b981", text: "B", x: 300, y: 100, width: 120, height: 60 }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.message.includes("Duplicate"))).toBe(true)
    })
  })

  describe("warnings", () => {
    it("should warn when flowchart has no nodes", () => {
      const input = JSON.stringify({
        nodes: [],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
      expect(result.warnings.some(w => w.message.includes("no nodes"))).toBe(true)
    })

    it("should warn on non-standard colors", () => {
      const input = JSON.stringify({
        nodes: [
          { id: "node-1", shape: "box", color: "#custom1", text: "A", x: 100, y: 100, width: 120, height: 60 }
        ],
        connections: []
      })
      const result = validateFlowchart(input)
      expect(result.valid).toBe(true)
      expect(result.warnings.some(w => w.message.includes("non-standard color"))).toBe(true)
    })
  })
})
