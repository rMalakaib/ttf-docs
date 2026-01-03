"use client"

import type { ParsedWallet } from "@/lib/validators"

interface WalletPreviewProps {
  wallets: ParsedWallet[]
  className?: string
}

export function WalletPreview({ wallets, className = "" }: WalletPreviewProps) {
  if (!wallets || wallets.length === 0) {
    return (
      <div className={`text-gray-400 italic ${className}`}>
        No wallets to preview
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {wallets.map((wallet, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{wallet.title}</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {wallet.chain}
            </span>
          </div>

          {wallet.description && (
            <p className="text-sm text-gray-600 mb-3">{wallet.description}</p>
          )}

          <div className="bg-gray-50 rounded-md p-2">
            <code className="text-xs font-mono text-gray-700 break-all">
              {wallet.address}
            </code>
          </div>

          {/* Address format indicator */}
          <div className="mt-2 flex items-center gap-2">
            {wallet.address.startsWith("0x") ? (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                EVM Address
              </span>
            ) : (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Non-EVM Address
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="text-sm text-gray-500 mt-4">
        Total: {wallets.length} wallet{wallets.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
