"use client"

import { useState, useRef, useCallback } from "react"
import { parseCsv, readFileAsText } from "@/lib/csv-ingress/parser"
import type { CsvRow, ParsedCsvResult } from "@/lib/csv-ingress/types"

interface CsvUploadProps {
  onParsed: (result: ParsedCsvResult) => void
  accept?: string
  className?: string
}

export function CsvUpload({ onParsed, accept = ".csv", className = "" }: CsvUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      onParsed({
        rows: [],
        errors: ["Please select a CSV file"],
        warnings: []
      })
      return
    }

    setIsProcessing(true)
    setFileName(file.name)

    try {
      const text = await readFileAsText(file)
      const result = parseCsv(text)
      onParsed(result)
    } catch (error) {
      onParsed({
        rows: [],
        errors: [`Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`],
        warnings: []
      })
    } finally {
      setIsProcessing(false)
    }
  }, [onParsed])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }
          ${isProcessing ? "opacity-50 cursor-wait" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <svg
            className={`w-12 h-12 ${isDragging ? "text-blue-500" : "text-gray-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          {isProcessing ? (
            <p className="text-gray-600">Processing...</p>
          ) : fileName ? (
            <p className="text-gray-600">
              <span className="font-medium">{fileName}</span>
              <br />
              <span className="text-sm text-gray-500">Click or drop to replace</span>
            </p>
          ) : (
            <p className="text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
              <br />
              <span className="text-sm text-gray-500">CSV files only</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface CsvTextInputProps {
  onParsed: (result: ParsedCsvResult) => void
  placeholder?: string
  className?: string
}

export function CsvTextInput({ onParsed, placeholder, className = "" }: CsvTextInputProps) {
  const [text, setText] = useState("")

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)

    if (value.trim()) {
      const result = parseCsv(value)
      onParsed(result)
    } else {
      onParsed({ rows: [], errors: [], warnings: [] })
    }
  }, [onParsed])

  return (
    <div className={className}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder || "Paste CSV content here...\n\norder,answerText\n1,\"Your answer here\""}
        className="w-full h-48 p-4 font-mono text-sm border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

interface SingleRowInputProps {
  onParsed: (answerText: string) => void
  placeholder?: string
  className?: string
  value?: string
  onValueChange?: (value: string) => void
  exampleText?: string
}

export function SingleRowInput({
  onParsed,
  placeholder,
  className = "",
  value: controlledValue,
  onValueChange,
  exampleText
}: SingleRowInputProps) {
  const [internalText, setInternalText] = useState("")

  // Use controlled value if provided, otherwise internal state
  const text = controlledValue !== undefined ? controlledValue : internalText
  const setText = onValueChange || setInternalText

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
    onParsed(value)
  }, [onParsed, setText])

  const handleLoadExample = useCallback(() => {
    if (exampleText) {
      setText(exampleText)
      onParsed(exampleText)
    }
  }, [exampleText, setText, onParsed])

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">
          Enter answerText Content
        </label>
        {exampleText && (
          <button
            onClick={handleLoadExample}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Load Example
          </button>
        )}
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder || "Enter answerText content here..."}
        className="w-full h-48 p-4 font-mono text-sm border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <p className="mt-1 text-xs text-gray-500">
        This should be the raw string value that goes in the <code className="bg-gray-100 px-1 rounded">answerText</code> column of your CSV.
      </p>
    </div>
  )
}
