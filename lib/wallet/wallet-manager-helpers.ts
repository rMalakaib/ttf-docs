"use client"

import type { Wallet } from "@/types/index"

/**
 *  * ### **Wallet Manager Helper**
 * if question not "text" then answer revision needs to be converted to json. 

#### **Saving Data (Component → Backend)**

\`\`\`typescript
import { walletArrayToJSON } from "@/lib/wallet/wallet-manager-helpers"

// In your component
function saveWallets(wallets: Wallet[]) {
  // Convert wallet array to JSON object (title as key)
  const walletJSON = walletArrayToJSON(wallets)
  
  // Convert to string for backend
  const jsonString = JSON.stringify(walletJSON)
  
  // Send to backend
  await fetch('/api/wallets', {
    method: 'POST',
    body: JSON.stringify({ data: jsonString }),
  })
}
\`\`\`

#### **Loading Data (Backend → Component)**

\`\`\`typescript
import { 
  parseWalletData, 
  validateWalletData,
  getWalletByTitle 
} from "@/lib/wallet/wallet-manager-helpers"

// Fetch from backend
async function loadWalletsFromBackend(userId: string) {
  const response = await fetch(`/api/wallets/${userId}`)
  const { data } = await response.json() // data is a JSON string
  
  // Parse the JSON string into wallet array
  const wallets = parseWalletData(data)
  
  if (!validateWalletData(wallets)) {
    throw new Error("Invalid wallet data")
  }
  
  return wallets
}

// In your component
function MyWalletComponent() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  
  useEffect(() => {
    loadWalletsFromBackend('user-456').then(data => {
      setWallets(data)
      // You can now pass this to WalletManager as initial data
    })
  }, [])
  
  // Find a specific wallet
  const mainWallet = getWalletByTitle(wallets, "Main Wallet")
}
\`\`\`
 * Parse a JSON string into wallet data
 * The backend stores wallets as: { "Wallet Title": { description: "...", address: "..." } }
 * @param jsonString - The JSON string from the backend
 * @returns Array of Wallet objects or null if invalid
 */
export function parseWalletJSON(jsonString: string): Wallet[] | null {
  try {
    const parsed = JSON.parse(jsonString)
    return convertWalletJSONToArray(parsed)
  } catch (error) {
    console.error("[Wallet Manager Helper] Failed to parse JSON:", error)
    return null
  }
}

/**
 * Convert the saved JSON format (title as key) to an array of Wallet objects
 * @param data - The parsed JSON object with titles as keys
 * @returns Array of Wallet objects or null if invalid
 */
export function convertWalletJSONToArray(data: any): Wallet[] | null {
  if (!data || typeof data !== "object") return null

  try {
    const wallets: Wallet[] = []

    for (const [title, walletData] of Object.entries(data)) {
      if (typeof walletData !== "object" || walletData === null) {
        console.warn(`[Wallet Manager Helper] Invalid wallet data for "${title}"`)
        continue
      }

      const wallet = walletData as any

      wallets.push({
        id: `wallet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        description: wallet.description || "",
        address: wallet.address || "",
        chain: wallet.chain || "", // Added chain field support
      })
    }

    return wallets
  } catch (error) {
    console.error("[Wallet Manager Helper] Failed to convert wallet data:", error)
    return null
  }
}

/**
 * Convert an array of Wallet objects to the saved JSON format (title as key)
 * @param wallets - Array of Wallet objects
 * @returns Object with wallet titles as keys
 */
export function convertWalletArrayToJSON(
  wallets: Wallet[],
): Record<string, { description: string; address: string; chain: string }> {
  const jsonOutput: Record<string, { description: string; address: string; chain: string }> = {} // Added chain to return type

  wallets.forEach((wallet) => {
    if (wallet.title.trim()) {
      jsonOutput[wallet.title] = {
        description: wallet.description,
        address: wallet.address,
        chain: wallet.chain, // Include chain in saved data
      }
    }
  })

  return jsonOutput
}

/**
 * Validate wallet data structure
 * @param wallet - The wallet object to validate
 * @returns True if valid, false otherwise
 */
export function validateWallet(wallet: any): wallet is Wallet {
  if (!wallet || typeof wallet !== "object") return false

  return (
    typeof wallet.id === "string" &&
    typeof wallet.title === "string" &&
    typeof wallet.description === "string" &&
    typeof wallet.address === "string" &&
    typeof wallet.chain === "string" // Added chain validation
  )
}

/**
 * Sanitize wallet data - fix common issues
 * @param wallets - Array of wallet objects to sanitize
 * @returns Sanitized array of wallets
 */
export function sanitizeWalletData(wallets: any[]): Wallet[] {
  if (!Array.isArray(wallets)) return []

  return wallets
    .filter((wallet) => wallet && typeof wallet === "object")
    .map((wallet, index) => ({
      id: wallet.id || `wallet-${Date.now()}-${index}`,
      title: String(wallet.title || ""),
      description: String(wallet.description || ""),
      address: String(wallet.address || ""),
      chain: String(wallet.chain || ""), // Added chain to sanitization
    }))
}

/**
 * Rebuild the wallet manager state from saved JSON
 * @param jsonString - The JSON string from the backend
 * @returns Array of Wallet objects ready to load into the component
 */
export function rebuildWalletManagerState(jsonString: string): Wallet[] | null {
  return parseWalletJSON(jsonString)
}

/**
 * Create an empty wallet
 * @returns Empty Wallet object
 */
export function createEmptyWallet(): Wallet {
  return {
    id: `wallet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: "",
    description: "",
    address: "",
    chain: "", // Added chain field to empty wallet
  }
}

/**
 * Get a summary of wallet data
 * @param wallets - Array of Wallet objects
 * @returns Summary object with counts and validation info
 */
export function getWalletSummary(wallets: Wallet[]) {
  const validWallets = wallets.filter((w) => w.title.trim() && w.address.trim())
  const incompleteWallets = wallets.filter((w) => !w.title.trim() || !w.address.trim())

  return {
    totalWallets: wallets.length,
    validWallets: validWallets.length,
    incompleteWallets: incompleteWallets.length,
    walletsWithDescription: wallets.filter((w) => w.description.trim()).length,
  }
}

/**
 * Validate that a wallet address looks reasonable
 * This is a basic check - you may want to add more specific validation
 * @param address - The wallet address to validate
 * @returns True if the address looks valid
 */
export function validateWalletAddress(address: string): boolean {
  if (!address || typeof address !== "string") return false

  // Basic checks - adjust based on your blockchain
  const trimmed = address.trim()

  // Check for common patterns (Ethereum, Solana, etc.)
  const ethereumPattern = /^0x[a-fA-F0-9]{40}$/
  const solanaPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

  return ethereumPattern.test(trimmed) || solanaPattern.test(trimmed)
}
