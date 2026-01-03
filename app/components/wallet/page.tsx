"use client"

import { useState } from "react"
import { SingleRowInput } from "@/components/csv-upload"
import { ErrorDisplay, SuccessDisplay } from "@/components/error-display"
import { WalletPreview } from "@/components/wallet-preview"
import { validateWallet, type WalletValidationResult } from "@/lib/validators"

// Example that matches what would be in CSV answerText column - 3 wallets
// CSV format uses doubled quotes ("") for escaping inside quoted fields
const EXAMPLE_WALLET_JSON = '"{""Treasury"":{""description"":""Main treasury for protocol operations"",""address"":""0x1234567890abcdef1234567890abcdef12345678"",""chain"":""ethereum""},""Staking Pool"":{""description"":""Staking rewards distribution"",""address"":""7nYBqPqCAuuSNUpGN3ZFhJ9h5s6N8bKfLp1xP3nZwWvz"",""chain"":""solana""},""Operations"":{""description"":""Day-to-day operational expenses"",""address"":""0xabcdef1234567890abcdef1234567890abcdef12"",""chain"":""polygon""}}"'

export default function WalletComponentPage() {
  const [inputText, setInputText] = useState("")
  const [validation, setValidation] = useState<WalletValidationResult | null>(null)

  const handleInput = (text: string) => {
    setInputText(text)
    if (text.trim()) {
      const result = validateWallet(text)
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
          <h1 className="text-3xl font-bold text-gray-900">Wallet Answer Type</h1>
          <p className="text-gray-600 mt-2">
            Test and validate wallet address data for CSV ingress.
          </p>
        </div>

        {/* Component Overview */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Wallet Answers</h2>
          <p className="text-gray-600 mb-4">
            Wallet answers store a collection of blockchain wallet addresses with metadata. Each wallet entry includes the wallet name,
            purpose description, blockchain address, and chain identifier.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">JSON Structure</h4>
              <p className="text-sm text-green-700 mb-2">Wallet name is the key, not a field:</p>
              <pre className="bg-green-100 p-2 rounded text-xs overflow-x-auto">{`{
  "Wallet Name": {
    "description": "...",
    "address": "0x...",
    "chain": "ethereum"
  }
}`}</pre>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• All three fields are <strong>required</strong></li>
                <li>• Chain is free-text (any string)</li>
                <li>• Address format is not validated</li>
                <li>• Duplicate wallet names not allowed</li>
                <li>• Empty strings will cause errors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-1">Testing Raw CSV Content</h3>
          <p className="text-sm text-blue-700">
            Enter the exact string that will appear in your CSV&apos;s <code className="bg-blue-100 px-1 rounded">answerText</code> column.
            For JSON types like wallet, this means a JSON string with escaped quotes if needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Test Wallet Data</h2>
              <SingleRowInput
                onParsed={handleInput}
                value={inputText}
                onValueChange={setInputText}
                exampleText={EXAMPLE_WALLET_JSON}
                placeholder={`Paste your wallet JSON string here...

The JSON should have wallet names as keys, each with:
- description: Purpose of wallet
- address: Blockchain address
- chain: Network name (ethereum, solana, etc.)`}
              />
            </div>

            {/* Validation Results */}
            {validation && (
              <div className="space-y-4">
                {validation.valid && validation.parsedData && (
                  <SuccessDisplay
                    message="Valid wallet data"
                    details={[
                      `${validation.parsedData.length} wallet(s) parsed successfully`,
                      ...validation.parsedData.map(w => `✓ ${w.title} (${w.chain}): ${w.address.slice(0, 10)}...`)
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
                          {error.message.includes("address") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Each wallet must have a non-empty &quot;address&quot; field.
                            </p>
                          )}
                          {error.message.includes("chain") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Each wallet must have a non-empty &quot;chain&quot; field (e.g., &quot;ethereum&quot;, &quot;solana&quot;).
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

            {/* Required Fields Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Required Fields</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Field</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b">
                    <td className="py-2"><code className="bg-gray-100 px-1">title</code></td>
                    <td className="py-2">string (key)</td>
                    <td className="py-2">Wallet name (used as JSON object key)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code className="bg-gray-100 px-1">description</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Purpose of the wallet</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code className="bg-gray-100 px-1">address</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Blockchain address</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code className="bg-gray-100 px-1">chain</code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Network (ethereum, solana, polygon, etc.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="min-h-[300px]">
                {validation?.parsedData ? (
                  <WalletPreview wallets={validation.parsedData} />
                ) : (
                  <div className="text-gray-400 italic text-center py-8">
                    <p>Enter wallet JSON to see preview</p>
                    <p className="text-sm mt-2">Click &quot;Load Example&quot; above to see a sample</p>
                  </div>
                )}
              </div>
            </div>

            {/* CSV Format Example */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">How It Appears in CSV</h3>
              <p className="text-sm text-gray-600 mb-3">
                When you put this in a CSV file, the JSON needs to be quoted and internal quotes doubled:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`order,answerText
3,"{""Treasury"":{""description"":""Main treasury"",""address"":""0x1234..."",""chain"":""ethereum""}}"`}
              </pre>
            </div>

            {/* JSON Schema */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Schema</h3>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// answerText format (JSON string)
{
  [walletTitle: string]: {
    description: string
    address: string
    chain: string
  }
}

// Supported chains (any string accepted)
"ethereum" | "solana" | "polygon" |
"arbitrum" | "optimism" | "base" |
"avalanche" | "bnb" | "fantom" | ...`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
