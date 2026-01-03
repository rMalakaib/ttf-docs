"use client"

import { useState } from "react"
import { SingleRowInput } from "@/components/csv-upload"
import { ErrorDisplay, SuccessDisplay } from "@/components/error-display"
import { AllocationPreview } from "@/components/allocation-preview"
import { validateAllocation, type AllocationValidationResult } from "@/lib/validators"

// Example using raw JSON format
const EXAMPLE_ALLOCATION_JSON = '{"textExplanation":"## Token Distribution\\n\\nOur token allocation prioritizes ecosystem growth and community incentives.\\n\\n- **Ecosystem (40%):** Protocol incentives and grants\\n- **Team (20%):** Subject to 4-year vesting\\n- **Community (40%):** Airdrops and programs","supplyAllocation":{"categories":[{"id":"cat-1","label":"Ecosystem","tokenAmount":400000000,"percentage":40,"color":"#8B5CF6"},{"id":"cat-2","label":"Team","tokenAmount":200000000,"percentage":20,"color":"#3B82F6"},{"id":"cat-3","label":"Community","tokenAmount":400000000,"percentage":40,"color":"#10B981"}],"totalSupply":1000000000,"tokenTicker":"TKN"},"vestingSchedule":{"dataPoints":[{"quarterLabel":"Q1 2025","timestamp":"2025-01-01T00:00:00Z","categories":{"Ecosystem":50000000,"Team":0,"Community":100000000}},{"quarterLabel":"Q2 2025","timestamp":"2025-04-01T00:00:00Z","categories":{"Ecosystem":100000000,"Team":50000000,"Community":200000000}}],"categories":["Ecosystem","Team","Community"],"colors":{"Ecosystem":"#8B5CF6","Team":"#3B82F6","Community":"#10B981"}},"meta":{"version":"1.0","timestamp":"2025-01-01T00:00:00Z"}}'

export default function AllocationComponentPage() {
  const [inputText, setInputText] = useState("")
  const [validation, setValidation] = useState<AllocationValidationResult | null>(null)

  const handleInput = (text: string) => {
    setInputText(text)
    if (text.trim()) {
      const result = validateAllocation(text)
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
          <h1 className="text-3xl font-bold text-gray-900">Allocation Builder Answer Type</h1>
          <p className="text-gray-600 mt-2">
            Test and validate token allocation and vesting schedule data for CSV ingress.
          </p>
        </div>

        {/* Component Overview */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Allocation Builder</h2>
          <p className="text-gray-600 mb-4">
            The Allocation Builder displays token distribution with a pie chart and vesting schedule table.
            It combines visual allocation data with a text explanation section.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Required Sections</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>textExplanation</strong>: Markdown description</li>
                <li>• <strong>supplyAllocation</strong>: Pie chart categories</li>
                <li>• <strong>vestingSchedule</strong>: Unlock schedule data</li>
                <li>• <strong>meta</strong>: Version and timestamp</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Critical Requirements</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Percentages <strong>must sum to exactly 100</strong></li>
                <li>• Token amounts must equal totalSupply</li>
                <li>• Category labels must match across sections</li>
                <li>• meta.version must be &quot;1.0&quot;</li>
              </ul>
            </div>
          </div>

          {/* Production Color Palette */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Production Color Palette</h4>
            <p className="text-sm text-gray-600 mb-3">
              The production UI uses these purple shades for allocation categories. You can use any hex color,
              but these are recommended for consistency:
            </p>
            <div className="flex flex-wrap gap-2">
              {["#F3E5FF", "#E9D5FF", "#DCC5FF", "#D0B5FF", "#C3A5FF", "#B695FF", "#A985FF", "#9C75FF", "#8F65FF", "#8255FF", "#7545FF", "#6835FF", "#5B25FF", "#4E15FF", "#4105FF"].map((color, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[9px] text-gray-500 mt-1 font-mono">{color}</span>
                </div>
              ))}
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
              <h2 className="text-lg font-semibold mb-4">Test Allocation Data</h2>
              <SingleRowInput
                onParsed={handleInput}
                value={inputText}
                onValueChange={setInputText}
                exampleText={EXAMPLE_ALLOCATION_JSON}
                placeholder={`Paste your allocation JSON string here...

Required structure:
- textExplanation: Markdown description
- supplyAllocation: {categories, totalSupply, tokenTicker}
- vestingSchedule: {dataPoints, categories, colors}
- meta: {version, timestamp}`}
              />
            </div>

            {/* Validation Results */}
            {validation && (
              <div className="space-y-4">
                {validation.valid && validation.parsedData && (
                  <SuccessDisplay
                    message="Valid allocation data"
                    details={[
                      `Token: ${validation.parsedData.supplyAllocation.tokenTicker}`,
                      `Total Supply: ${validation.parsedData.supplyAllocation.totalSupply.toLocaleString()}`,
                      `${validation.parsedData.supplyAllocation.categories.length} allocation categories`,
                      `${validation.parsedData.vestingSchedule.dataPoints.length} vesting periods`
                    ]}
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
                              Tip: Allocation JSON must have textExplanation, supplyAllocation, vestingSchedule, and meta fields.
                            </p>
                          )}
                          {error.message.includes("categories") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Each category needs id, label, tokenAmount, percentage, and color fields.
                            </p>
                          )}
                          {error.message.includes("percentage") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Category percentages must sum to exactly 100.
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

            {/* Validation Rules */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Validation Rules</h3>
              <ul className="text-sm space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Percentages must sum to 100%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Token amounts must sum to totalSupply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Category labels must match across allocation and vesting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Each category needs: id, label, tokenAmount, percentage, color</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Colors should be hex format (#RRGGBB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>meta.version must be &quot;1.0&quot;</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="min-h-[400px]">
                {validation?.parsedData ? (
                  <AllocationPreview data={validation.parsedData} />
                ) : (
                  <div className="text-gray-400 italic text-center py-8">
                    <p>Enter allocation JSON to see preview</p>
                    <p className="text-sm mt-2">Click &quot;Load Example&quot; above to see a sample</p>
                  </div>
                )}
              </div>
            </div>

            {/* Required Structure */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Required Structure</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`{
  "textExplanation": string,  // Markdown text
  "supplyAllocation": {
    "categories": [
      {
        "id": string,
        "label": string,
        "tokenAmount": number,
        "percentage": number,  // 0-100
        "color": string       // "#RRGGBB"
      }
    ],
    "totalSupply": number,
    "tokenTicker": string
  },
  "vestingSchedule": {
    "dataPoints": [
      {
        "quarterLabel": string,
        "timestamp": string,   // ISO 8601
        "categories": {
          [label]: number      // tokens unlocked
        }
      }
    ],
    "categories": string[],
    "colors": { [label]: string }
  },
  "meta": {
    "version": "1.0",
    "timestamp": string        // ISO 8601
  }
}`}
              </pre>
            </div>

            {/* CSV Format Example */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">How It Appears in CSV</h3>
              <p className="text-sm text-gray-600 mb-3">
                In CSV, the JSON is minified and quoted with internal quotes doubled:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`order,answerText
5,"{""textExplanation"":""..."",""supplyAllocation"":{...}}"`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
