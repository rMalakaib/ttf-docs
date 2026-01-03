"use client"

import { useMemo } from "react"
import type { AllocationBuilderData } from "@/lib/validators"

interface AllocationPreviewProps {
  data: AllocationBuilderData
  className?: string
}

export function AllocationPreview({ data, className = "" }: AllocationPreviewProps) {
  if (!data) {
    return (
      <div className={`text-gray-400 italic ${className}`}>
        No allocation data to preview
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Token Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-blue-600 font-medium">Token Ticker</span>
            <p className="text-2xl font-bold text-blue-900">{data.supplyAllocation.tokenTicker}</p>
          </div>
          <div className="border-l border-blue-200 pl-4">
            <span className="text-sm text-blue-600 font-medium">Total Supply</span>
            <p className="text-2xl font-bold text-blue-900">
              {data.supplyAllocation.totalSupply.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Pie Chart Visualization */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <PieChart categories={data.supplyAllocation.categories} />
        </div>

        {/* Categories Table */}
        <div className="flex-grow">
          <h4 className="font-semibold text-gray-900 mb-3">Supply Allocation</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Category</th>
                  <th className="text-right py-2 px-4">Tokens</th>
                  <th className="text-right py-2 pl-4">%</th>
                </tr>
              </thead>
              <tbody>
                {data.supplyAllocation.categories.map((cat, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.label}
                      </div>
                    </td>
                    <td className="text-right py-2 px-4 font-mono">
                      {cat.tokenAmount.toLocaleString()}
                    </td>
                    <td className="text-right py-2 pl-4 font-mono">
                      {cat.percentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vesting Schedule */}
      {data.vestingSchedule.dataPoints.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Vesting Schedule</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Quarter</th>
                  {data.vestingSchedule.categories.map((cat, index) => (
                    <th key={index} className="text-right py-2 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: data.vestingSchedule.colors[cat] }}
                        />
                        <span className="truncate max-w-[80px]" title={cat}>{cat}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.vestingSchedule.dataPoints.map((dp, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">{dp.quarterLabel}</td>
                    {data.vestingSchedule.categories.map((cat, catIndex) => (
                      <td key={catIndex} className="text-right py-2 px-2 font-mono text-gray-600">
                        {(dp.categories[cat] || 0).toLocaleString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Text Explanation */}
      {data.textExplanation && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Explanation</h4>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
            {data.textExplanation.replace(/\\n/g, "\n")}
          </div>
        </div>
      )}
    </div>
  )
}

function PieChart({ categories }: { categories: AllocationBuilderData["supplyAllocation"]["categories"] }) {
  const size = 200
  const center = size / 2
  const radius = 80

  const segments = useMemo(() => {
    let currentAngle = -90 // Start from top

    return categories.map(cat => {
      const angle = (cat.percentage / 100) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle

      // Convert to radians
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      // Calculate arc path
      const x1 = center + radius * Math.cos(startRad)
      const y1 = center + radius * Math.sin(startRad)
      const x2 = center + radius * Math.cos(endRad)
      const y2 = center + radius * Math.sin(endRad)

      const largeArc = angle > 180 ? 1 : 0

      const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`

      return {
        path,
        color: cat.color,
        label: cat.label,
        percentage: cat.percentage
      }
    })
  }, [categories])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, index) => (
        <path
          key={index}
          d={seg.path}
          fill={seg.color}
          stroke="#ffffff"
          strokeWidth={2}
        >
          <title>{seg.label}: {seg.percentage.toFixed(1)}%</title>
        </path>
      ))}
    </svg>
  )
}
