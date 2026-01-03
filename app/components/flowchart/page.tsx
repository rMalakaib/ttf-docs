"use client"

import { useState } from "react"
import { SingleRowInput } from "@/components/csv-upload"
import { ErrorDisplay, SuccessDisplay } from "@/components/error-display"
import { FlowchartPreview } from "@/components/flowchart-preview"
import { validateFlowchart, type FlowchartValidationResult } from "@/lib/validators/flowchart-validator"

// Example that matches production format - raw JSON (no CSV quote escaping)
const EXAMPLE_FLOWCHART_JSON = '{"nodes":[{"id":"node-1","shape":"rect","color":"#3b82f6","text":"Token Sale","x":100,"y":100,"width":120,"height":60},{"id":"node-2","shape":"rect","color":"#10b981","text":"Treasury","x":280,"y":100,"width":120,"height":60},{"id":"node-3","shape":"circle","color":"#8b5cf6","text":"Distribution","x":460,"y":100,"width":80,"height":80}],"connections":[{"id":"conn-1","fromNodeId":"node-1","toNodeId":"node-2","fromSide":"right","toSide":"left","direction":"right"},{"id":"conn-2","fromNodeId":"node-2","toNodeId":"node-3","fromSide":"right","toSide":"left","direction":"right"}],"meta":{"version":"1.0","timestamp":"2025-01-01T00:00:00Z"}}'

export default function FlowchartComponentPage() {
  const [inputText, setInputText] = useState("")
  const [validation, setValidation] = useState<FlowchartValidationResult | null>(null)

  const handleInput = (text: string) => {
    setInputText(text)
    if (text.trim()) {
      const result = validateFlowchart(text)
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
          <h1 className="text-3xl font-bold text-gray-900">Flowchart Answer Type</h1>
          <p className="text-gray-600 mt-2">
            Test and validate flowchart diagrams with nodes and connections for CSV ingress.
          </p>
        </div>

        {/* Component Overview */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Flowcharts</h2>
          <p className="text-gray-600 mb-4">
            Flowcharts visualize processes, token flows, or organizational structures using nodes and connections.
            The component renders an interactive diagram based on the provided JSON data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Node Shapes</h4>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-blue-500 rounded" />
                  <code className="text-xs bg-blue-100 px-1">rect</code>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full" />
                  <code className="text-xs bg-blue-100 px-1">circle</code>
                </div>
              </div>
              <p className="text-xs text-blue-700">Only &quot;rect&quot; and &quot;circle&quot; are supported</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Recommended Colors</h4>
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 rounded" style={{ backgroundColor: "#3b82f6" }} />
                <div className="w-6 h-6 rounded" style={{ backgroundColor: "#10b981" }} />
                <div className="w-6 h-6 rounded" style={{ backgroundColor: "#ef4444" }} />
                <div className="w-6 h-6 rounded" style={{ backgroundColor: "#f59e0b" }} />
                <div className="w-6 h-6 rounded" style={{ backgroundColor: "#8b5cf6" }} />
              </div>
              <p className="text-xs text-purple-700">#3b82f6, #10b981, #ef4444, #f59e0b, #8b5cf6</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Connection Properties</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <strong>Sides:</strong>
                <code className="block bg-yellow-100 p-1 mt-1 text-xs rounded">top | right | bottom | left</code>
              </div>
              <div>
                <strong>Arrow Direction:</strong>
                <code className="block bg-yellow-100 p-1 mt-1 text-xs rounded">left | right | both</code>
              </div>
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
              <h2 className="text-lg font-semibold mb-4">Test Flowchart Data</h2>
              <SingleRowInput
                onParsed={handleInput}
                value={inputText}
                onValueChange={setInputText}
                exampleText={EXAMPLE_FLOWCHART_JSON}
                placeholder={`Paste your flowchart JSON string here...

Required structure:
- nodes: Array of node objects
- connections: Array of connection objects
- meta: { version, timestamp }`}
              />
            </div>

            {/* Validation Results */}
            {validation && (
              <div className="space-y-4">
                {validation.valid && validation.parsedData && (
                  <SuccessDisplay
                    message="Valid flowchart data"
                    details={[
                      `${validation.parsedData.nodes.length} node(s)`,
                      `${validation.parsedData.connections.length} connection(s)`,
                      ...validation.parsedData.nodes.map(n => `✓ ${n.text} (${n.shape})`)
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
                          {error.message.includes("shape") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Valid shapes are &quot;rect&quot; or &quot;circle&quot;.
                            </p>
                          )}
                          {error.message.includes("references non-existent") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Connection nodeIds must reference existing node IDs.
                            </p>
                          )}
                          {error.message.includes("Side") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Valid sides are &quot;top&quot;, &quot;right&quot;, &quot;bottom&quot;, or &quot;left&quot;.
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

            {/* Node Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Node Properties</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Shapes</span>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-6 bg-blue-500 rounded"></div>
                      <code className="text-xs">rect</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <code className="text-xs">circle</code>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Recommended Colors</span>
                  <div className="flex gap-2 mt-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#3b82f6" }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#10b981" }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#ef4444" }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#f59e0b" }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: "#8b5cf6" }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    #3b82f6, #10b981, #ef4444, #f59e0b, #8b5cf6
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Required Fields</span>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li><code className="bg-gray-100 px-1">id</code> - Unique identifier</li>
                    <li><code className="bg-gray-100 px-1">shape</code> - &quot;rect&quot; or &quot;circle&quot;</li>
                    <li><code className="bg-gray-100 px-1">color</code> - Hex color (#RRGGBB)</li>
                    <li><code className="bg-gray-100 px-1">text</code> - Node label</li>
                    <li><code className="bg-gray-100 px-1">x, y</code> - Position coordinates</li>
                    <li><code className="bg-gray-100 px-1">width, height</code> - Dimensions</li>
                  </ul>
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
                  <FlowchartPreview data={validation.parsedData} />
                ) : (
                  <div className="text-gray-400 italic text-center py-8">
                    <p>Enter flowchart JSON to see preview</p>
                    <p className="text-sm mt-2">Click &quot;Load Example&quot; above to see a sample</p>
                  </div>
                )}
              </div>
            </div>

            {/* Connection Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Connection Properties</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Required Fields</span>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li><code className="bg-gray-100 px-1">id</code> - Unique identifier</li>
                    <li><code className="bg-gray-100 px-1">fromNodeId</code> - Source node ID</li>
                    <li><code className="bg-gray-100 px-1">toNodeId</code> - Target node ID</li>
                    <li><code className="bg-gray-100 px-1">fromSide</code> - Side of source node</li>
                    <li><code className="bg-gray-100 px-1">toSide</code> - Side of target node</li>
                    <li><code className="bg-gray-100 px-1">direction</code> - Arrow direction</li>
                  </ul>
                </div>
                <div>
                  <span className="font-medium">Sides</span>
                  <code className="block mt-1 text-xs bg-gray-100 p-2 rounded">
                    &quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;
                  </code>
                </div>
                <div>
                  <span className="font-medium">Direction</span>
                  <code className="block mt-1 text-xs bg-gray-100 p-2 rounded">
                    &quot;left&quot; | &quot;right&quot; | &quot;both&quot;
                  </code>
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
4,"{""nodes"":[...],""connections"":[...],""meta"":{...}}"`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
