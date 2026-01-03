"use client"

import { useState } from "react"
import type { FinancialStatementData, Section, Row } from "@/lib/validators"

// Helper types for row type narrowing
type NumberRow = Extract<Row, { type: "number" }>
type TotalRow = Extract<Row, { type: "total" }>

interface FinancialPreviewProps {
  data: FinancialStatementData
  className?: string
}

type StatementTab = "income" | "balance" | "cashflow"

export function FinancialPreview({ data, className = "" }: FinancialPreviewProps) {
  const [activeTab, setActiveTab] = useState<StatementTab>("income")

  if (!data) {
    return (
      <div className={`text-gray-400 italic ${className}`}>
        No financial data to preview
      </div>
    )
  }

  const statements: Record<StatementTab, { label: string; data: { blocks: Section[] } }> = {
    income: { label: "Income Statement", data: data.incomeStatement },
    balance: { label: "Balance Sheet", data: data.balanceSheet },
    cashflow: { label: "Cash Flow", data: data.cashFlowStatement }
  }

  const activeStatement = statements[activeTab]

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Meta Info */}
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center gap-4 text-sm">
        {data.meta.companyName && (
          <span className="font-medium text-gray-900">{data.meta.companyName}</span>
        )}
        {data.meta.period && (
          <span className="text-gray-600">{data.meta.period}</span>
        )}
        <span className="text-gray-600">{data.meta.currency}</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {(Object.keys(statements) as StatementTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {statements[tab].label}
          </button>
        ))}
      </div>

      {/* Statement Content */}
      <div className="p-4">
        {activeStatement.data.blocks.length === 0 ? (
          <p className="text-gray-400 italic text-center py-8">
            No data in {activeStatement.label}
          </p>
        ) : (
          <StatementTable
            blocks={activeStatement.data.blocks}
            currency={data.meta.currency}
          />
        )}
      </div>
    </div>
  )
}

function StatementTable({ blocks, currency }: { blocks: Section[]; currency: string }) {
  // Calculate totals from sources
  const calculateTotal = (sources: string[], allRows: Map<string, number>): number => {
    return sources.reduce((sum, sourceId) => {
      return sum + (allRows.get(sourceId) || 0)
    }, 0)
  }

  // Build a map of all row values for total calculation
  const rowValues = new Map<string, number>()
  blocks.forEach(section => {
    section.rows?.forEach(row => {
      if (row.type === "number") {
        const numRow = row as NumberRow
        rowValues.set(row.id, numRow.value)
      }
    })
  })

  return (
    <div className="space-y-6">
      {blocks.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
            {section.title?.title || `Section ${sectionIndex + 1}`}
          </h4>
          <table className="w-full text-sm">
            <tbody>
              {section.rows?.map((row, rowIndex) => {
                if (row.type === "number") {
                  const numRow = row as NumberRow
                  return (
                    <tr key={rowIndex} className="border-b border-gray-100">
                      <td className="py-2 pr-4 text-gray-700">
                        {numRow.customLabel || numRow.attr}
                      </td>
                      <td className="py-2 text-right font-mono text-gray-900">
                        {formatCurrency(numRow.value, currency)}
                      </td>
                    </tr>
                  )
                }

                if (row.type === "total") {
                  const totalRow = row as TotalRow
                  const totalValue = calculateTotal(totalRow.sources || [], rowValues)
                  return (
                    <tr key={rowIndex} className="border-b-2 border-gray-300 font-semibold">
                      <td className="py-2 pr-4 text-gray-900">
                        {totalRow.totalTitle}
                      </td>
                      <td className="py-2 text-right font-mono text-gray-900">
                        {formatCurrency(totalValue, currency)}
                      </td>
                    </tr>
                  )
                }

                return null
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

function formatCurrency(value: number, currency: string): string {
  const formatted = Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  const symbol = currency === "USD" ? "$" : currency

  if (value < 0) {
    return `(${symbol}${formatted})`
  }
  return `${symbol}${formatted}`
}
