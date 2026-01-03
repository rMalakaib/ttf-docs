"use client"

import { useState } from "react"
import { SingleRowInput } from "@/components/csv-upload"
import { ErrorDisplay, SuccessDisplay } from "@/components/error-display"
import { FinancialPreview } from "@/components/financial-preview"
import { validateFinancial, type FinancialValidationResult } from "@/lib/validators"

// Example that matches what would be in CSV answerText column (minified JSON string)
// CSV format uses doubled quotes ("") for escaping inside quoted fields
// Includes companyName in meta section
const EXAMPLE_FINANCIAL_JSON = '"{""incomeStatement"":{""blocks"":[{""id"":""sec-1"",""title"":{""id"":""t-1"",""type"":""title"",""title"":""Revenue""},""rows"":[{""id"":""r-1"",""type"":""number"",""attr"":""Revenue"",""value"":5000000},{""id"":""r-2"",""type"":""number"",""attr"":""IS_APY_VAULTS"",""value"":1200000},{""id"":""r-3"",""type"":""total"",""totalTitle"":""IS_TOTAL_REVENUE"",""sources"":[""r-1"",""r-2""]}]}]},""balanceSheet"":{""blocks"":[{""id"":""bs-1"",""title"":{""id"":""bs-t-1"",""type"":""title"",""title"":""Assets""},""rows"":[{""id"":""bs-r-1"",""type"":""number"",""attr"":""BS_CASH_EQ"",""value"":2500000},{""id"":""bs-r-2"",""type"":""number"",""attr"":""BS_DIGITAL_ASSETS_OFFCHAIN"",""value"":8000000}]}]},""cashFlowStatement"":{""blocks"":[]},""meta"":{""companyName"":""ExampleDAO Foundation"",""currency"":""USD"",""period"":""Q4 2024"",""timestamp"":""2025-01-01T00:00:00Z"",""version"":""1.0""}}"'

export default function FinancialComponentPage() {
  const [inputText, setInputText] = useState("")
  const [validation, setValidation] = useState<FinancialValidationResult | null>(null)

  const handleInput = (text: string) => {
    setInputText(text)
    if (text.trim()) {
      const result = validateFinancial(text)
      setValidation(result)
    } else {
      setValidation(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Documentation
          </a>
          <h1 className="text-3xl font-bold text-gray-900">Financial Statement Answer Type</h1>
          <p className="text-gray-600 mt-2">
            Test and validate financial statement data (Income, Balance Sheet, Cash Flow) for CSV ingress.
          </p>
        </div>

        {/* Component Overview */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Financial Statements</h2>
          <p className="text-gray-600 mb-4">
            Financial statements display Income Statement, Balance Sheet, and Cash Flow data.
            Each statement contains sections with line items that can be number rows or calculated totals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Income Statement</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Revenue line items</li>
                <li>• Expense categories</li>
                <li>• Operating income</li>
                <li>• Net income totals</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Balance Sheet</h4>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Assets (current/long-term)</li>
                <li>• Liabilities</li>
                <li>• Equity accounts</li>
                <li>• Total calculations</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Cash Flow</h4>
              <ul className="text-xs text-purple-700 space-y-1">
                <li>• Operating activities</li>
                <li>• Investing activities</li>
                <li>• Financing activities</li>
                <li>• Net change in cash</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Row Types</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <div>
                  <strong>Number Row:</strong> A single line item with attr code and value.
                </div>
                <div>
                  <strong>Total Row:</strong> Sums values from source row IDs.
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Meta Fields</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <code className="bg-gray-200 px-1 text-xs">companyName</code>: Optional entity name</li>
                <li>• <code className="bg-gray-200 px-1 text-xs">currency</code>: e.g., &quot;USD&quot;</li>
                <li>• <code className="bg-gray-200 px-1 text-xs">period</code>: e.g., &quot;Q4 2024&quot;</li>
                <li>• <code className="bg-gray-200 px-1 text-xs">version</code>: Must be &quot;1.0&quot;</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-1">Testing Raw CSV Content</h3>
          <p className="text-sm text-blue-700">
            Enter the exact string that will appear in your CSV&apos;s <code className="bg-blue-100 px-1 rounded">answerText</code> column.
            This is typically a minified JSON string with proper escaping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Test Financial Data</h2>
              <SingleRowInput
                onParsed={handleInput}
                value={inputText}
                onValueChange={setInputText}
                exampleText={EXAMPLE_FINANCIAL_JSON}
                placeholder={`Paste your financial statement JSON string here...

Required structure:
- incomeStatement: { blocks: [...] }
- balanceSheet: { blocks: [...] }
- cashFlowStatement: { blocks: [...] }
- meta: { currency, period, timestamp, version }`}
              />
            </div>

            {/* Validation Results */}
            {validation && (
              <div className="space-y-4">
                {validation.valid && validation.parsedData && (
                  <SuccessDisplay
                    message="Valid financial data"
                    details={[
                      `Currency: ${validation.parsedData.meta.currency}`,
                      validation.parsedData.meta.period ? `Period: ${validation.parsedData.meta.period}` : "",
                      `Income Statement: ${validation.parsedData.incomeStatement.blocks.length} section(s)`,
                      `Balance Sheet: ${validation.parsedData.balanceSheet.blocks.length} section(s)`,
                      `Cash Flow: ${validation.parsedData.cashFlowStatement.blocks.length} section(s)`
                    ].filter(Boolean)}
                  />
                )}

                {!validation.valid && validation.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Validation Failed ({validation.errors.length} error{validation.errors.length !== 1 ? "s" : ""})
                    </h4>
                    <ul className="space-y-2">
                      {validation.errors.map((error, index) => (
                        <li key={index} className="text-sm">
                          <div className="flex items-start gap-2">
                            <span className="font-mono text-red-600 bg-red-100 px-1.5 py-0.5 rounded text-xs">
                              {error.field}
                            </span>
                            <span className="text-red-700">{error.message}</span>
                          </div>
                          {/* Show fix suggestions based on error type */}
                          {error.field === "json" && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Make sure your input is valid JSON. Check for missing quotes, commas, or brackets.
                            </p>
                          )}
                          {error.field === "structure" && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Financial JSON must have incomeStatement, balanceSheet, cashFlowStatement, and meta fields.
                            </p>
                          )}
                          {error.message.includes("blocks") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Each statement needs a &quot;blocks&quot; array with section data.
                            </p>
                          )}
                          {error.message.includes("version") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: meta.version must be &quot;1.0&quot;.
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {validation.warnings.length > 0 && (
                  <ErrorDisplay errors={[]} warnings={validation.warnings} />
                )}
              </div>
            )}

            {/* Common Attributes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Common Attribute Codes</h3>
              <div className="grid grid-cols-1 gap-4 text-xs">
                <div>
                  <span className="font-medium text-gray-700">Income Statement</span>
                  <code className="block mt-1 bg-gray-100 p-2 rounded">
                    Revenue, IS_APY_VAULTS, IS_LP_FEE_INCOME, COGS, SG&A, IS_SALARIES
                  </code>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Balance Sheet</span>
                  <code className="block mt-1 bg-gray-100 p-2 rounded">
                    BS_CASH_EQ, BS_DIGITAL_ASSETS_OFFCHAIN, BS_AR, BS_AP, BS_RETAINED_EARNINGS
                  </code>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Cash Flow</span>
                  <code className="block mt-1 bg-gray-100 p-2 rounded">
                    CF_NI, CF_CASH_RECEIPTS, CF_CAPEX, CF_LOAN_PROCEEDS, CF_LOAN_REPAY
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="min-h-[400px]">
                {validation?.parsedData ? (
                  <FinancialPreview data={validation.parsedData} />
                ) : (
                  <div className="text-gray-400 italic text-center py-8">
                    <p>Enter financial JSON to see preview</p>
                    <p className="text-sm mt-2">Click &quot;Load Example&quot; above to see a sample</p>
                  </div>
                )}
              </div>
            </div>

            {/* Row Types */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Row Types</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-blue-700">Number Row</span>
                  <pre className="mt-1 text-xs bg-gray-100 p-2 rounded">
{`{
  "id": "row-1",
  "type": "number",
  "attr": "Revenue",
  "value": 1000000
}`}
                  </pre>
                </div>
                <div>
                  <span className="font-medium text-green-700">Total Row</span>
                  <pre className="mt-1 text-xs bg-gray-100 p-2 rounded">
{`{
  "id": "total-1",
  "type": "total",
  "totalTitle": "IS_TOTAL_REVENUE",
  "sources": ["row-1", "row-2"]
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* CSV Format Example */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">How It Appears in CSV</h3>
              <p className="text-sm text-gray-600 mb-3">
                In CSV, the JSON is minified and quoted with internal quotes doubled:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`order,answerText
6,"{""incomeStatement"":{""blocks"":[...]},""meta"":{...}}"`}
              </pre>
            </div>
          </div>
        </div>

        {/* Attribute Codes Reference */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Standard Attribute Codes</h2>
            <a
              href="/test-data/financial-attribute-codes.csv"
              download="financial-attribute-codes.csv"
              className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full Code Map (CSV)
            </a>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Each <code className="bg-gray-100 px-1">attr</code> value in a number row must be a standard code that maps to a display label.
            Total rows use <code className="bg-gray-100 px-1">totalTitle</code> codes. Download the full reference above.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Income Statement (IS_*)</h4>
              <ul className="text-xs text-gray-600 space-y-1 max-h-48 overflow-y-auto">
                <li><code className="bg-blue-50 px-1">Revenue</code> → Revenue</li>
                <li><code className="bg-blue-50 px-1">IS_APY_VAULTS</code> → APY earned on vaults</li>
                <li><code className="bg-blue-50 px-1">IS_LP_FEE_INCOME</code> → Liquidity pool fee income</li>
                <li><code className="bg-blue-50 px-1">IS_SALARIES</code> → Salaries</li>
                <li><code className="bg-blue-50 px-1">COGS</code> → COGS</li>
                <li><code className="bg-blue-50 px-1">SG&A</code> → SG&A</li>
                <li><code className="bg-blue-50 px-1">IS_INTEREST_INCOME</code> → Interest income</li>
                <li><code className="bg-blue-50 px-1">IS_INTEREST_EXPENSE</code> → Interest expense</li>
              </ul>
              <p className="text-xs text-gray-400 mt-2">Totals: IS_TOTAL_REVENUE, IS_GROSS_PROFIT, IS_NET_INCOME_LOSS...</p>
            </div>

            <div>
              <h4 className="font-medium text-green-700 mb-2">Balance Sheet (BS_*)</h4>
              <ul className="text-xs text-gray-600 space-y-1 max-h-48 overflow-y-auto">
                <li><code className="bg-green-50 px-1">BS_CASH_EQ</code> → Cash and cash equivalents</li>
                <li><code className="bg-green-50 px-1">BS_DIGITAL_ASSETS_OFFCHAIN</code> → Digital assets (custodied)</li>
                <li><code className="bg-green-50 px-1">BS_AR</code> → Accounts receivable</li>
                <li><code className="bg-green-50 px-1">BS_AP</code> → Accounts payable</li>
                <li><code className="bg-green-50 px-1">BS_RETAINED_EARNINGS</code> → Retained earnings</li>
                <li><code className="bg-green-50 px-1">BS_LOANS_ST</code> → Loans payable (short-term)</li>
                <li><code className="bg-green-50 px-1">BS_LOANS_LT</code> → Loans payable (long-term)</li>
              </ul>
              <p className="text-xs text-gray-400 mt-2">Totals: BS_TOTAL_ASSETS, BS_TOTAL_LIAB, BS_TOTAL_EQUITY...</p>
            </div>

            <div>
              <h4 className="font-medium text-purple-700 mb-2">Cash Flow (CF_*)</h4>
              <ul className="text-xs text-gray-600 space-y-1 max-h-48 overflow-y-auto">
                <li><code className="bg-purple-50 px-1">CF_NI</code> → Net income (loss)</li>
                <li><code className="bg-purple-50 px-1">CF_CASH_RECEIPTS</code> → Cash receipts from operations</li>
                <li><code className="bg-purple-50 px-1">CF_CAPEX</code> → Equipment and capital expenditures</li>
                <li><code className="bg-purple-50 px-1">CF_LOAN_PROCEEDS</code> → Loan proceeds</li>
                <li><code className="bg-purple-50 px-1">CF_LOAN_REPAY</code> → Loan repayments</li>
                <li><code className="bg-purple-50 px-1">CF_TOKEN_SALE_PROCEEDS</code> → Token sale proceeds</li>
                <li><code className="bg-purple-50 px-1">CF_EQUITY_CONTRIB</code> → Equity contributions</li>
              </ul>
              <p className="text-xs text-gray-400 mt-2">Totals: CF_NET_CASH_OPERATING, CF_NET_CHANGE_CASH...</p>
            </div>
          </div>
        </div>

        {/* Full JSON Schema */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Full JSON Schema</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`{
  "incomeStatement": {
    "blocks": [
      {
        "id": string,                    // Unique section ID
        "title": {
          "id": string,
          "type": "title",
          "title": string                // Section heading
        },
        "rows": [
          // Number Row
          {
            "id": string,                // Unique row ID
            "type": "number",
            "attr": string,              // Standard code (e.g., "IS_SALARIES")
            "value": number              // Numeric value
          },
          // Total Row
          {
            "id": string,
            "type": "total",
            "totalTitle": string,        // Total code (e.g., "IS_TOTAL_REVENUE")
            "sources": string[]          // IDs of rows to sum
          }
        ]
      }
    ]
  },
  "balanceSheet": {
    "blocks": [/* Same structure as incomeStatement */]
  },
  "cashFlowStatement": {
    "blocks": [/* Same structure as incomeStatement */]
  },
  "meta": {
    "companyName": string,               // Optional - entity name
    "currency": string,                  // Required - e.g., "USD"
    "period": string,                    // Optional - e.g., "Q4 2024"
    "timestamp": string,                 // Required - ISO 8601 date
    "version": "1.0"                     // Required - must be "1.0"
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
