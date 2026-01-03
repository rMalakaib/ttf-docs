import type { ValidationResult, ValidationError } from "@/lib/csv-ingress/types"
import { parseCsvField } from "./csv-utils"

export interface FlowchartNode {
  id: string
  shape: "rect" | "circle"
  color: string
  text: string
  x: number
  y: number
  width: number
  height: number
  customSize?: boolean
}

export interface FlowchartConnection {
  id: string
  fromNodeId: string
  toNodeId: string
  fromSide: "top" | "right" | "bottom" | "left"
  toSide: "top" | "right" | "bottom" | "left"
  direction: "left" | "right" | "both"
}

export interface FlowchartData {
  nodes: FlowchartNode[]
  connections: FlowchartConnection[]
  meta?: {
    version: string
    timestamp: string
  }
}

export interface FlowchartValidationResult extends ValidationResult {
  parsedData?: FlowchartData
}

const VALID_SHAPES = ["rect", "circle"]
const VALID_COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6"]
const VALID_SIDES = ["top", "right", "bottom", "left"]
const VALID_DIRECTIONS = ["left", "right", "both"]

export function validateFlowchart(answerText: string): FlowchartValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check for empty content
  if (!answerText || answerText.trim().length === 0) {
    errors.push({
      field: "answerText",
      message: "Flowchart data cannot be empty",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Parse CSV field escaping (handles "" -> " and removes outer quotes)
  const jsonText = parseCsvField(answerText)

  // Try to parse as JSON
  let flowchartData: FlowchartData
  try {
    flowchartData = JSON.parse(jsonText)
  } catch (e) {
    errors.push({
      field: "json",
      message: `Invalid JSON: ${e instanceof Error ? e.message : "Parse error"}`,
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Check structure
  if (typeof flowchartData !== "object" || flowchartData === null) {
    errors.push({
      field: "structure",
      message: "Flowchart data must be a JSON object with nodes and connections arrays",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Check nodes array
  if (!Array.isArray(flowchartData.nodes)) {
    errors.push({
      field: "nodes",
      message: "Flowchart must have a 'nodes' array",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Check connections array
  if (!Array.isArray(flowchartData.connections)) {
    errors.push({
      field: "connections",
      message: "Flowchart must have a 'connections' array",
      severity: "error"
    })
    return { valid: false, errors, warnings }
  }

  // Validate each node
  const nodeIds = new Set<string>()
  flowchartData.nodes.forEach((node, index) => {
    const prefix = `nodes[${index}]`

    // Check id
    if (typeof node.id !== "string" || !node.id.trim()) {
      errors.push({
        field: `${prefix}.id`,
        message: `Node ${index} is missing required field: id`,
        severity: "error"
      })
    } else if (nodeIds.has(node.id)) {
      errors.push({
        field: `${prefix}.id`,
        message: `Duplicate node id: "${node.id}"`,
        severity: "error"
      })
    } else {
      nodeIds.add(node.id)
    }

    // Check shape
    if (!VALID_SHAPES.includes(node.shape)) {
      errors.push({
        field: `${prefix}.shape`,
        message: `Node "${node.id}" has invalid shape "${node.shape}". Must be one of: ${VALID_SHAPES.join(", ")}`,
        severity: "error"
      })
    }

    // Check color
    if (typeof node.color !== "string") {
      errors.push({
        field: `${prefix}.color`,
        message: `Node "${node.id}" is missing required field: color`,
        severity: "error"
      })
    } else if (!VALID_COLORS.includes(node.color.toLowerCase())) {
      warnings.push({
        field: `${prefix}.color`,
        message: `Node "${node.id}" has non-standard color "${node.color}". Recommended colors: ${VALID_COLORS.join(", ")}`,
        severity: "warning"
      })
    }

    // Check text
    if (typeof node.text !== "string") {
      errors.push({
        field: `${prefix}.text`,
        message: `Node "${node.id}" is missing required field: text`,
        severity: "error"
      })
    }

    // Check position
    if (typeof node.x !== "number" || !Number.isFinite(node.x)) {
      errors.push({
        field: `${prefix}.x`,
        message: `Node "${node.id}" has invalid x position`,
        severity: "error"
      })
    }
    if (typeof node.y !== "number" || !Number.isFinite(node.y)) {
      errors.push({
        field: `${prefix}.y`,
        message: `Node "${node.id}" has invalid y position`,
        severity: "error"
      })
    }

    // Check dimensions
    if (typeof node.width !== "number" || node.width <= 0) {
      errors.push({
        field: `${prefix}.width`,
        message: `Node "${node.id}" has invalid width`,
        severity: "error"
      })
    }
    if (typeof node.height !== "number" || node.height <= 0) {
      errors.push({
        field: `${prefix}.height`,
        message: `Node "${node.id}" has invalid height`,
        severity: "error"
      })
    }
  })

  // Validate each connection
  flowchartData.connections.forEach((conn, index) => {
    const prefix = `connections[${index}]`

    // Check id
    if (typeof conn.id !== "string" || !conn.id.trim()) {
      errors.push({
        field: `${prefix}.id`,
        message: `Connection ${index} is missing required field: id`,
        severity: "error"
      })
    }

    // Check fromNodeId
    if (typeof conn.fromNodeId !== "string" || !conn.fromNodeId.trim()) {
      errors.push({
        field: `${prefix}.fromNodeId`,
        message: `Connection "${conn.id}" is missing required field: fromNodeId`,
        severity: "error"
      })
    } else if (!nodeIds.has(conn.fromNodeId)) {
      errors.push({
        field: `${prefix}.fromNodeId`,
        message: `Connection "${conn.id}" references non-existent node: "${conn.fromNodeId}"`,
        severity: "error"
      })
    }

    // Check toNodeId
    if (typeof conn.toNodeId !== "string" || !conn.toNodeId.trim()) {
      errors.push({
        field: `${prefix}.toNodeId`,
        message: `Connection "${conn.id}" is missing required field: toNodeId`,
        severity: "error"
      })
    } else if (!nodeIds.has(conn.toNodeId)) {
      errors.push({
        field: `${prefix}.toNodeId`,
        message: `Connection "${conn.id}" references non-existent node: "${conn.toNodeId}"`,
        severity: "error"
      })
    }

    // Check fromSide
    if (!VALID_SIDES.includes(conn.fromSide)) {
      errors.push({
        field: `${prefix}.fromSide`,
        message: `Connection "${conn.id}" has invalid fromSide "${conn.fromSide}". Must be one of: ${VALID_SIDES.join(", ")}`,
        severity: "error"
      })
    }

    // Check toSide
    if (!VALID_SIDES.includes(conn.toSide)) {
      errors.push({
        field: `${prefix}.toSide`,
        message: `Connection "${conn.id}" has invalid toSide "${conn.toSide}". Must be one of: ${VALID_SIDES.join(", ")}`,
        severity: "error"
      })
    }

    // Check direction
    if (!VALID_DIRECTIONS.includes(conn.direction)) {
      errors.push({
        field: `${prefix}.direction`,
        message: `Connection "${conn.id}" has invalid direction "${conn.direction}". Must be one of: ${VALID_DIRECTIONS.join(", ")}`,
        severity: "error"
      })
    }
  })

  // Warn if no nodes
  if (flowchartData.nodes.length === 0) {
    warnings.push({
      field: "nodes",
      message: "Flowchart has no nodes. Consider adding at least one node.",
      severity: "warning"
    })
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    parsedData: errors.length === 0 ? flowchartData : undefined
  }
}
