"use client"

import Link from "next/link"

export default function DocsIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CSV Ingress Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive tools to test and validate CSV data for the Token Transparency Portal.
          </p>
        </div>

        {/* Main Filing Validator */}
        <div className="mb-12">
          <Link
            href="/b1-filing"
            className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">B1 TGE Filing Validator</h2>
                <p className="text-blue-100 text-lg">
                  Upload a complete B1 TGE Filing CSV and validate all 11 questions at once.
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-blue-200">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Full filing validation
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview all answers
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Detailed error messages
                  </span>
                </div>
              </div>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Component Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Validators</h2>
          <p className="text-gray-600 mb-6">
            Test individual answer types in isolation. Each component has specialized validation and a live preview.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ComponentCard
              href="/components/text"
              title="Text"
              description="Plain text and markdown content with bold, italic, lists, and tables."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              color="blue"
            />

            <ComponentCard
              href="/components/wallet"
              title="Wallet"
              description="Wallet addresses with chain, description, and address format validation."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              }
              color="green"
            />

            <ComponentCard
              href="/components/flowchart"
              title="Flowchart"
              description="Visual diagrams with nodes and connections for process flows."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              }
              color="purple"
            />

            <ComponentCard
              href="/components/allocation"
              title="Allocation Builder"
              description="Token allocation categories and vesting schedules with pie chart."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              }
              color="amber"
            />

            <ComponentCard
              href="/components/financial"
              title="Financial Statements"
              description="Income statement, balance sheet, and cash flow data."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              color="red"
            />
          </div>
        </div>

        {/* CSV Format Reference */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">CSV Format Reference</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Basic Structure</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`order,answerText
1,"Answer to question 1"
2,"Answer to question 2"
3,"{""json"":""data""}"`}
              </pre>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li><strong>order:</strong> Question number (1-indexed)</li>
                <li><strong>answerText:</strong> Text or JSON string</li>
                <li>Escape quotes with <code className="bg-gray-100 px-1">""</code></li>
                <li>Use <code className="bg-gray-100 px-1">\n</code> for line breaks in text</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">B1 TGE Filing Questions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Order</th>
                      <th className="text-left py-2 pr-4">Question</th>
                      <th className="text-left py-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">1</td>
                      <td className="py-2 pr-4">Description of Project</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">2</td>
                      <td className="py-2 pr-4">Known Project Team</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">3</td>
                      <td className="py-2 pr-4">DAO Structure</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">4</td>
                      <td className="py-2 pr-4">Foundation & DevCo</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-amber-50">
                      <td className="py-2 pr-4 font-medium">5</td>
                      <td className="py-2 pr-4">Initial Allocation</td>
                      <td className="py-2"><code className="bg-amber-200 text-amber-800 px-1 text-xs">allocation</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">6</td>
                      <td className="py-2 pr-4">Airdrop Process</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">7</td>
                      <td className="py-2 pr-4">Market Maker Agreements</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">8</td>
                      <td className="py-2 pr-4">CEX/DEX Agreements</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">9</td>
                      <td className="py-2 pr-4">Prior Token Sales</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 pr-4">10</td>
                      <td className="py-2 pr-4">Previous Exploits</td>
                      <td className="py-2"><code className="bg-blue-100 text-blue-800 px-1 text-xs">text</code></td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="py-2 pr-4">11</td>
                      <td className="py-2 pr-4">Material Risk Factors (opt)</td>
                      <td className="py-2"><code className="bg-gray-200 text-gray-600 px-1 text-xs">text</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

interface ComponentCardProps {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  color: "blue" | "green" | "purple" | "amber" | "red"
}

function ComponentCard({ href, title, description, icon, color }: ComponentCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    green: "bg-green-50 text-green-600 group-hover:bg-green-100",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    red: "bg-red-50 text-red-600 group-hover:bg-red-100"
  }

  return (
    <Link
      href={href}
      className="group bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 flex flex-col"
    >
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-colors ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
      <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
        Try it
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
