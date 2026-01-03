"use client"

import { useMemo } from "react"
import type { FlowchartData, FlowchartNode, FlowchartConnection } from "@/lib/validators/flowchart-validator"

interface FlowchartPreviewProps {
  data: FlowchartData
  className?: string
}

export function FlowchartPreview({ data, className = "" }: FlowchartPreviewProps) {
  if (!data || !data.nodes || data.nodes.length === 0) {
    return (
      <div className={`text-gray-400 italic ${className}`}>
        No flowchart to preview
      </div>
    )
  }

  // Calculate canvas bounds
  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

    data.nodes.forEach(node => {
      minX = Math.min(minX, node.x)
      minY = Math.min(minY, node.y)
      maxX = Math.max(maxX, node.x + node.width)
      maxY = Math.max(maxY, node.y + node.height)
    })

    const padding = 40
    return {
      minX: minX - padding,
      minY: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2
    }
  }, [data.nodes])

  // Create node lookup for connections
  const nodeMap = useMemo(() => {
    const map = new Map<string, FlowchartNode>()
    data.nodes.forEach(node => map.set(node.id, node))
    return map
  }, [data.nodes])

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-auto ${className}`}>
      <svg
        width="100%"
        height={Math.max(400, bounds.height)}
        viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
        className="min-w-full"
      >
        {/* Render connections first (behind nodes) */}
        {data.connections.map(conn => (
          <ConnectionLine
            key={conn.id}
            connection={conn}
            nodeMap={nodeMap}
          />
        ))}

        {/* Render nodes */}
        {data.nodes.map(node => (
          <NodeShape key={node.id} node={node} />
        ))}
      </svg>

      <div className="p-3 bg-gray-50 border-t text-sm text-gray-600">
        {data.nodes.length} node{data.nodes.length !== 1 ? "s" : ""}, {data.connections.length} connection{data.connections.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}

function NodeShape({ node }: { node: FlowchartNode }) {
  const textLines = node.text.split("\n")

  if (node.shape === "circle") {
    const cx = node.x + node.width / 2
    const cy = node.y + node.height / 2
    const r = Math.min(node.width, node.height) / 2

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={node.color}
          stroke="#ffffff"
          strokeWidth={2}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontSize={12}
          fontWeight={500}
        >
          {textLines.map((line, i) => (
            <tspan
              key={i}
              x={cx}
              dy={i === 0 ? 0 : 14}
            >
              {line}
            </tspan>
          ))}
        </text>
      </g>
    )
  }

  // Box shape (default)
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={8}
        ry={8}
        fill={node.color}
        stroke="#ffffff"
        strokeWidth={2}
      />
      <text
        x={node.x + node.width / 2}
        y={node.y + node.height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize={12}
        fontWeight={500}
      >
        {textLines.map((line, i) => (
          <tspan
            key={i}
            x={node.x + node.width / 2}
            dy={i === 0 ? -((textLines.length - 1) * 7) : 14}
          >
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function ConnectionLine({
  connection,
  nodeMap
}: {
  connection: FlowchartConnection
  nodeMap: Map<string, FlowchartNode>
}) {
  const fromNode = nodeMap.get(connection.fromNodeId)
  const toNode = nodeMap.get(connection.toNodeId)

  if (!fromNode || !toNode) return null

  // Calculate connection points
  const fromPoint = getConnectionPoint(fromNode, connection.fromSide)
  const toPoint = getConnectionPoint(toNode, connection.toSide)

  // Simple straight line for now
  const path = `M ${fromPoint.x} ${fromPoint.y} L ${toPoint.x} ${toPoint.y}`

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#9ca3af"
        strokeWidth={2}
        markerEnd={connection.direction === "left" ? undefined : "url(#arrowhead)"}
        markerStart={connection.direction === "both" || connection.direction === "left" ? "url(#arrowhead-reverse)" : undefined}
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth={10}
          markerHeight={7}
          refX={9}
          refY={3.5}
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
        </marker>
        <marker
          id="arrowhead-reverse"
          markerWidth={10}
          markerHeight={7}
          refX={1}
          refY={3.5}
          orient="auto"
        >
          <polygon points="10 0, 0 3.5, 10 7" fill="#9ca3af" />
        </marker>
      </defs>
    </g>
  )
}

function getConnectionPoint(node: FlowchartNode, side: string): { x: number; y: number } {
  const cx = node.x + node.width / 2
  const cy = node.y + node.height / 2

  switch (side) {
    case "top":
      return { x: cx, y: node.y }
    case "bottom":
      return { x: cx, y: node.y + node.height }
    case "left":
      return { x: node.x, y: cy }
    case "right":
      return { x: node.x + node.width, y: cy }
    default:
      return { x: cx, y: cy }
  }
}
