"use client"

import { useState } from "react"
import { SingleRowInput } from "@/components/csv-upload"
import { ErrorDisplay, SuccessDisplay } from "@/components/error-display"
import { TextPreview, TextPreviewStyles } from "@/components/text-preview"
import { validateText, type TextValidationResult } from "@/lib/validators/text-validator"

// Example that matches what would be in CSV answerText column
// CSV format uses \n for line breaks (escaped as \\n in the CSV string)
const EXAMPLE_TEXT = `"**Project Overview**\\n\\nOur protocol enables *decentralized* trading across multiple chains with minimal fees.\\n\\n**Key Features:**\\n- Low transaction fees\\n- Fast settlement times\\n- Cross-chain compatibility\\n- Secure smart contracts\\n\\n| Metric | Value |\\n| --- | --- |\\n| TVL | $50M |\\n| Daily Volume | $5M |\\n| Active Users | 10,000 |"`

export default function TextComponentPage() {
  const [validation, setValidation] = useState<TextValidationResult | null>(null)
  const [inputText, setInputText] = useState("")

  const handleInput = (text: string) => {
    setInputText(text)
    if (text.trim()) {
      const result = validateText(text)
      setValidation(result)
    } else {
      setValidation(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TextPreviewStyles />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Documentation
          </a>
          <h1 className="text-3xl font-bold text-gray-900">Text Answer Type</h1>
          <p className="text-gray-600 mt-2">
            Test and validate text answers with markdown formatting support for CSV ingress.
          </p>
        </div>

        {/* Component Overview */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Text Answers</h2>
          <p className="text-gray-600 mb-4">
            Text answers support a <strong>limited subset of Markdown</strong> for formatting. Unlike full Markdown parsers,
            only specific formatting options are rendered in the production UI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Supported Formatting
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li><code className="bg-green-100 px-1">**bold**</code> → <strong>bold</strong></li>
                <li><code className="bg-green-100 px-1">*italic*</code> → <em>italic</em></li>
                <li><code className="bg-green-100 px-1">- bullet item</code> → bullet lists</li>
                <li><code className="bg-green-100 px-1">| col | col |</code> → tables</li>
                <li><code className="bg-green-100 px-1">\n</code> → line breaks (escaped newlines)</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                NOT Supported
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li><code className="bg-red-100 px-1"># Headers</code> (use **bold** instead)</li>
                <li><code className="bg-red-100 px-1">[links](url)</code> (URLs shown as text)</li>
                <li><code className="bg-red-100 px-1">![images](url)</code></li>
                <li><code className="bg-red-100 px-1">`code`</code> or code blocks</li>
                <li><code className="bg-red-100 px-1">&gt; blockquotes</code></li>
                <li>Numbered lists (use bullets instead)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Line Break Handling */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Line Breaks: Use \n</h3>
          <p className="text-sm text-yellow-700 mb-2">
            Production uses <code className="bg-yellow-100 px-1 rounded">\n</code> escape sequences for line breaks, not actual newlines.
            When you type <code className="bg-yellow-100 px-1 rounded">\n</code> in your CSV, it will render as a line break.
          </p>
          <div className="text-sm text-yellow-700">
            <strong>Example:</strong> <code className="bg-yellow-100 px-1 rounded">Line 1\nLine 2\nLine 3</code> renders as three separate lines.
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-1">Testing Raw CSV Content</h3>
          <p className="text-sm text-blue-700">
            Enter the exact string that will appear in your CSV&apos;s <code className="bg-blue-100 px-1 rounded">answerText</code> column.
            Use <code className="bg-blue-100 px-1 rounded">\n</code> for line breaks (not actual newlines).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Test Text Content</h2>
              <SingleRowInput
                onParsed={handleInput}
                value={inputText}
                onValueChange={setInputText}
                exampleText={EXAMPLE_TEXT}
                placeholder={`Enter your text answer here...

Supports markdown:
- **bold** text
- *italic* text
- Bullet lists with - prefix
- Tables with | separators
- Use \\n for line breaks`}
              />
            </div>

            {/* Validation Results */}
            {validation && (
              <div className="space-y-4">
                {validation.valid && (
                  <SuccessDisplay
                    message="Valid text content"
                    details={[
                      `${inputText.length} characters`,
                      validation.formattingDetected?.bold ? "✓ Bold formatting detected" : "",
                      validation.formattingDetected?.italic ? "✓ Italic formatting detected" : "",
                      validation.formattingDetected?.bulletLists ? "✓ Bullet lists detected" : "",
                      validation.formattingDetected?.tables ? "✓ Tables detected" : "",
                      validation.formattingDetected?.lineBreaks ? "✓ Line breaks detected" : "",
                    ].filter(Boolean)}
                  />
                )}

                {!validation.valid && validation.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Validation Failed
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
                          {error.message.includes("empty") && (
                            <p className="mt-1 text-xs text-red-600 ml-4">
                              Tip: Text content cannot be empty or whitespace-only.
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

            {/* Format Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Supported Formatting</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-1 text-xs">**bold**</code>
                    <span>→</span>
                    <strong>bold</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-1 text-xs">*italic*</code>
                    <span>→</span>
                    <em>italic</em>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700 mb-1">Line Breaks:</p>
                  <pre className="bg-gray-100 p-2 rounded text-xs">Line 1\nLine 2\nLine 3</pre>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700 mb-1">Bullet Lists:</p>
                  <pre className="bg-gray-100 p-2 rounded text-xs">- First item\n- Second item\n- Third item</pre>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700 mb-1">Tables:</p>
                  <pre className="bg-gray-100 p-2 rounded text-xs">| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="border rounded-lg p-4 min-h-[300px]">
                {inputText ? (
                  <TextPreview content={inputText} />
                ) : (
                  <div className="text-gray-400 italic text-center py-8">
                    <p>Enter text content to see preview</p>
                    <p className="text-sm mt-2">Click &quot;Load Example&quot; above to see a sample</p>
                  </div>
                )}
              </div>
            </div>

            {/* CSV Format Example */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">How It Appears in CSV</h3>
              <p className="text-sm text-gray-600 mb-3">
                In CSV, use <code className="bg-gray-100 px-1">\n</code> for line breaks. Quote the field if it contains special characters:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`order,answerText
1,"**Project Overview**\\nOur protocol enables trading."
2,"- Feature 1\\n- Feature 2\\n- Feature 3"
3,"| Metric | Value |\\n| --- | --- |\\n| TVL | $50M |"`}
              </pre>
            </div>

            {/* Schema Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">Schema</h3>
              <p className="text-sm text-gray-600 mb-2">
                Text answers are stored as plain strings with markdown formatting and <code className="bg-gray-100 px-1">\n</code> for line breaks.
              </p>
              <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// answerText format
type TextAnswer = string

// Examples
"Simple text answer"
"**Bold** and *italic* text"
"- Bullet point 1\\n- Bullet point 2"
"Line 1\\nLine 2\\nLine 3"`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
