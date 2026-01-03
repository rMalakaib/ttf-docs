"use client"

import type { ValidationError } from "@/lib/csv-ingress/types"

interface ErrorDisplayProps {
  errors: ValidationError[]
  warnings: ValidationError[]
  className?: string
}

export function ErrorDisplay({ errors, warnings, className = "" }: ErrorDisplayProps) {
  if (errors.length === 0 && warnings.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {errors.length} Error{errors.length !== 1 ? "s" : ""}
          </h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700 text-sm">
                <span className="font-mono text-red-600">{error.field}:</span> {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {warnings.length} Warning{warnings.length !== 1 ? "s" : ""}
          </h4>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-yellow-700 text-sm">
                <span className="font-mono text-yellow-600">{warning.field}:</span> {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

interface SuccessDisplayProps {
  message: string
  details?: string[]
  className?: string
}

export function SuccessDisplay({ message, details, className = "" }: SuccessDisplayProps) {
  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {message}
      </h4>
      {details && details.length > 0 && (
        <ul className="space-y-1">
          {details.map((detail, index) => (
            <li key={index} className="text-green-700 text-sm">{detail}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface ParseErrorsDisplayProps {
  errors: string[]
  warnings: string[]
  className?: string
}

export function ParseErrorsDisplay({ errors, warnings, className = "" }: ParseErrorsDisplayProps) {
  if (errors.length === 0 && warnings.length === 0) {
    return null
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">CSV Parse Errors</h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700 text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">CSV Warnings</h4>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-yellow-700 text-sm">{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
