"use client"

import { useState, useMemo, useCallback } from "react"
import { CsvUpload } from "@/components/csv-upload"
import { ErrorDisplay, SuccessDisplay } from "@/components/error-display"
import { TextPreview, TextPreviewStyles } from "@/components/text-preview"
import { AllocationPreview } from "@/components/allocation-preview"
import { B1_QUESTIONS, B1_SECTIONS, getQuestionsBySection, type B1Question } from "@/data/b1-questions"
import { validateByType } from "@/lib/validators"
import type { ParsedCsvResult, CsvRow, ValidationResult, ValidationError } from "@/lib/csv-ingress/types"

// B1 TGE Filing Example CSV - located at /test-data/b1-tge-filing-sample.csv
// This function downloads a complete example B1 filing
function downloadExampleCsv() {
  // Fetch the sample CSV from the public test-data folder
  fetch('/test-data/b1-tge-filing-sample.csv')
    .then(response => response.text())
    .then(csvContent => {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'b1-tge-filing-example.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
    .catch(err => {
      console.error('Failed to download example CSV:', err)
      alert('Failed to download example. Check if the file exists.')
    })
}

interface QuestionValidation {
  question: B1Question
  row: CsvRow | null
  validation: ValidationResult | null
  status: "valid" | "invalid" | "missing" | "empty"
}

export default function B1FilingPage() {
  const [csvResult, setCsvResult] = useState<ParsedCsvResult | null>(null)
  const [questionValidations, setQuestionValidations] = useState<QuestionValidation[]>([])
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())

  const handleCsvParsed = (result: ParsedCsvResult) => {
    setCsvResult(result)

    // Validate each question
    const validations: QuestionValidation[] = B1_QUESTIONS.map(question => {
      const row = result.rows.find(r => r.order === question.order) || null

      if (!row) {
        return {
          question,
          row: null,
          validation: null,
          status: question.required ? "missing" : "empty"
        }
      }

      if (!row.answerText.trim()) {
        return {
          question,
          row,
          validation: null,
          status: question.required ? "missing" : "empty"
        }
      }

      const validation = validateByType(row.answerText, question.questionType)

      return {
        question,
        row,
        validation,
        status: validation.valid ? "valid" : "invalid"
      }
    })

    setQuestionValidations(validations)
  }

  const toggleQuestion = (order: number) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev)
      if (next.has(order)) {
        next.delete(order)
      } else {
        next.add(order)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedQuestions(new Set(B1_QUESTIONS.map(q => q.order)))
  }

  const collapseAll = () => {
    setExpandedQuestions(new Set())
  }

  const handleClearData = () => {
    setCsvResult(null)
    setQuestionValidations([])
    setExpandedQuestions(new Set())
  }

  // Summary stats
  const stats = useMemo(() => {
    const valid = questionValidations.filter(v => v.status === "valid").length
    const invalid = questionValidations.filter(v => v.status === "invalid").length
    const missing = questionValidations.filter(v => v.status === "missing").length
    const empty = questionValidations.filter(v => v.status === "empty").length
    const required = B1_QUESTIONS.filter(q => q.required).length
    const requiredValid = questionValidations.filter(v => v.question.required && v.status === "valid").length

    return { valid, invalid, missing, empty, required, requiredValid }
  }, [questionValidations])

  const isComplete = stats.requiredValid === stats.required

  return (
    <div className="min-h-screen bg-gray-50">
      <TextPreviewStyles />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
            ← Back to Documentation
          </a>
          <h1 className="text-3xl font-bold text-gray-900">B1 TGE Filing Validator</h1>
          <p className="text-gray-600 mt-2">
            Upload a complete B1 TGE Filing CSV to validate all 11 questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* CSV Upload */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Upload B1 Filing CSV</h2>
              <CsvUpload onParsed={handleCsvParsed} />

              {/* Download Example Button */}
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={downloadExampleCsv}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Example CSV
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Complete B1 filing with all 11 questions filled out
                </p>
              </div>

              {/* Clear Data Button - only show when data is loaded */}
              {csvResult && (
                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={handleClearData}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Data
                  </button>
                </div>
              )}

              {csvResult && csvResult.errors.length > 0 && (
                <div className="mt-4">
                  <ErrorDisplay
                    errors={csvResult.errors.map(e => ({
                      field: "csv",
                      message: e,
                      severity: "error" as const
                    }))}
                    warnings={csvResult.warnings.map(w => ({
                      field: "csv",
                      message: w,
                      severity: "warning" as const
                    }))}
                  />
                </div>
              )}
            </div>

            {/* Validation Summary */}
            {questionValidations.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">Validation Summary</h3>

                {isComplete ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">All required questions valid!</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-medium">
                        {stats.requiredValid}/{stats.required} required questions valid
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Valid: {stats.valid}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Invalid: {stats.invalid}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Missing: {stats.missing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-300" />
                    <span>Empty (optional): {stats.empty}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex gap-2">
                  <button
                    onClick={expandAll}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            )}

            {/* Expand/Collapse buttons when no CSV uploaded */}
            {questionValidations.length === 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-3">Question Reference</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Review the 11 B1 TGE Filing questions below. Click each question to see detailed requirements.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-200"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            )}

            {/* CSV Format Reference */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-3">CSV Format</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto">
{`order,answerText
1,"Description of project..."
2,"Team members table..."
3,"DAO structure..."
4,"Foundation info..."
5,{"textExplanation":"...", ...}
6,"Airdrop details..."
7,"Market maker table..."
8,"Exchange agreements..."
9,"Prior sales table..."
10,"Exploits history..."
11,"[OPTIONAL] Risk factors..."`}
              </pre>
              <p className="mt-3 text-xs text-gray-500">
                Questions 1-4, 6-11 are text. Question 5 is allocation-builder JSON.
              </p>
            </div>
          </div>

          {/* Right Column - Question Details */}
          <div className="lg:col-span-2 space-y-4">
            {questionValidations.length === 0 ? (
              /* Show question reference when no CSV uploaded */
              B1_SECTIONS.map(section => (
                <div key={section} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    {section}
                  </h3>

                  {getQuestionsBySection(section).map(question => (
                    <QuestionReferenceCard
                      key={question.order}
                      question={question}
                      isExpanded={expandedQuestions.has(question.order)}
                      onToggle={() => toggleQuestion(question.order)}
                    />
                  ))}
                </div>
              ))
            ) : (
              B1_SECTIONS.map(section => (
                <div key={section} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                    {section}
                  </h3>

                  {getQuestionsBySection(section).map(question => {
                    const qv = questionValidations.find(v => v.question.order === question.order)
                    if (!qv) return null

                    const isExpanded = expandedQuestions.has(question.order)

                    return (
                      <QuestionCard
                        key={question.order}
                        validation={qv}
                        isExpanded={isExpanded}
                        onToggle={() => toggleQuestion(question.order)}
                      />
                    )
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface QuestionCardProps {
  validation: QuestionValidation
  isExpanded: boolean
  onToggle: () => void
}

function QuestionCard({ validation, isExpanded, onToggle }: QuestionCardProps) {
  const { question, row, validation: validationResult, status } = validation

  const statusColors = {
    valid: "bg-green-100 border-green-300 text-green-800",
    invalid: "bg-red-100 border-red-300 text-red-800",
    missing: "bg-yellow-100 border-yellow-300 text-yellow-800",
    empty: "bg-gray-100 border-gray-300 text-gray-600"
  }

  const statusIcons = {
    valid: (
      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    invalid: (
      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    missing: (
      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    empty: (
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
      </svg>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow border-l-4 ${statusColors[status].split(" ")[1]} overflow-hidden`}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {statusIcons[status]}
          <div className="text-left">
            <div className="font-medium text-gray-900">
              Q{question.order}: {question.title}
            </div>
            <div className="text-sm text-gray-500">
              {question.questionType}
              {!question.required && " (optional)"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          {/* Instructions */}
          <div className="mt-4 mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Instructions</h4>
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 whitespace-pre-wrap">
              {question.instructions}
            </div>
          </div>

          {/* Validation Errors */}
          {validationResult && (validationResult.errors.length > 0 || validationResult.warnings.length > 0) && (
            <div className="mb-4">
              <ErrorDisplay
                errors={validationResult.errors}
                warnings={validationResult.warnings}
              />
            </div>
          )}

          {/* Preview */}
          {row && row.answerText.trim() && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
              <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto">
                {question.questionType === "text" ? (
                  <TextPreview content={row.answerText} />
                ) : question.questionType === "allocation-builder" && validationResult?.valid ? (
                  <AllocationPreview data={(validationResult as any).parsedData} />
                ) : (
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                    {row.answerText}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Missing Message */}
          {status === "missing" && (
            <div className="text-yellow-700 bg-yellow-50 rounded-lg p-3 text-sm">
              This required question is missing from the CSV. Add a row with order {question.order}.
            </div>
          )}

          {/* Empty Optional Message */}
          {status === "empty" && (
            <div className="text-gray-600 bg-gray-50 rounded-lg p-3 text-sm">
              This optional question was not answered.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Reference card shown before CSV upload - displays question requirements
 */
interface QuestionReferenceCardProps {
  question: B1Question
  isExpanded: boolean
  onToggle: () => void
}

function QuestionReferenceCard({ question, isExpanded, onToggle }: QuestionReferenceCardProps) {
  const typeColors: Record<string, string> = {
    "text": "bg-blue-100 text-blue-800",
    "allocation-builder": "bg-purple-100 text-purple-800",
    "wallet": "bg-green-100 text-green-800",
    "flowchart": "bg-orange-100 text-orange-800",
    "financial": "bg-teal-100 text-teal-800"
  }

  return (
    <div className="bg-white rounded-lg shadow border-l-4 border-gray-300 overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-sm">
            {question.order}
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">
              {question.title}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[question.questionType] || "bg-gray-100 text-gray-800"}`}>
                {question.questionType}
              </span>
              {!question.required && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                  optional
                </span>
              )}
            </div>
          </div>
        </div>

        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content - shows full instructions */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Question Requirements</h4>
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {question.instructions}
            </div>
          </div>

          {/* Type-specific notes */}
          {question.questionType === "allocation-builder" && (
            <div className="mt-4 bg-purple-50 rounded-lg p-3 text-sm text-purple-800">
              <strong>Format:</strong> This question requires JSON data with token allocation categories, vesting schedules, and supply information.
              See the <a href="/components/allocation" className="underline hover:text-purple-600">Allocation Builder documentation</a> for the exact schema.
            </div>
          )}

          {question.questionType === "text" && (
            <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
              <strong>Format:</strong> Plain text with optional Markdown formatting. Supports **bold**, *italic*, bullet lists (- item), and tables (| col | col |).
            </div>
          )}
        </div>
      )}
    </div>
  )
}
