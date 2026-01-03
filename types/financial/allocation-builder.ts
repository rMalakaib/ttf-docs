export interface AllocationCategory {
  id: string
  label: string // e.g., "Ecosystem Development", "Team"
  tokenAmount: number // User enters this - actual number of tokens
  percentage: number // CALCULATED: (tokenAmount / totalSupply) * 100
  color: string // e.g., "#8B5CF6" (for pie chart)
}

export interface VestingDataPoint {
  quarterLabel: string // e.g., "Q4 2025"
  timestamp: string // ISO date for that quarter
  categories: {
    [categoryLabel: string]: number // tokens released per category
  }
}

export interface AllocationBuilderJSON {
  textExplanation: string // Markdown text from Tab 1

  supplyAllocation: {
    categories: AllocationCategory[]
    totalSupply: number // Total token supply
    tokenTicker: string // e.g., "MON"
  }

  vestingSchedule: {
    dataPoints: VestingDataPoint[]
    categories: string[] // Ordered list of category labels
    colors: { [categoryLabel: string]: string } // Color mapping
  }

  meta: {
    version: string
    timestamp: string
  }
}
