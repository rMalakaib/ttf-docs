"use client"

import { useMemo } from "react"
import { markdownToHtml } from "@/lib/validators/text-validator"

interface TextPreviewProps {
  content: string
  className?: string
}

export function TextPreview({ content, className = "" }: TextPreviewProps) {
  const html = useMemo(() => {
    if (!content) return ""
    return markdownToHtml(content)
  }, [content])

  if (!content) {
    return (
      <div className={`text-gray-400 italic ${className}`}>
        No content to preview
      </div>
    )
  }

  return (
    <div
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        // Custom styles for markdown rendering
      }}
    />
  )
}

// Styles for markdown tables and other elements
export function TextPreviewStyles() {
  return (
    <style jsx global>{`
      .prose .markdown-table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
      }
      .prose .markdown-table th,
      .prose .markdown-table td {
        border: 1px solid #e5e7eb;
        padding: 0.5rem 0.75rem;
        text-align: left;
      }
      .prose .markdown-table th {
        background-color: #f9fafb;
        font-weight: 600;
      }
      .prose .markdown-table tr:nth-child(even) {
        background-color: #f9fafb;
      }
      .prose h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
      }
      .prose h3 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 1.25rem;
        margin-bottom: 0.5rem;
      }
      .prose ul {
        list-style-type: disc;
        margin-left: 1.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .prose li {
        margin-bottom: 0.25rem;
      }
      .prose strong {
        font-weight: 600;
      }
      .prose em {
        font-style: italic;
      }
    `}</style>
  )
}
