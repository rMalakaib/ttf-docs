import type {
  AllocationBuilderJSON,
  AllocationCategory,
  VestingDataPoint,
} from "@/types/financial/allocation-builder"

export function parseAllocationBuilderJSON(
  jsonString: string
): AllocationBuilderJSON | null {
  try {
    const parsed = JSON.parse(jsonString)
    return validateAllocationBuilderJSON(parsed) ? parsed : null
  } catch (error) {
    console.error("[Allocation Builder Helper] Failed to parse JSON:", error)
    return null
  }
}

export function validateAllocationBuilderJSON(
  data: unknown
): data is AllocationBuilderJSON {
  if (!data || typeof data !== "object") return false

  const obj = data as Record<string, unknown>
  const supplyAllocation = obj.supplyAllocation as Record<string, unknown> | undefined
  const vestingSchedule = obj.vestingSchedule as Record<string, unknown> | undefined
  const meta = obj.meta as Record<string, unknown> | undefined

  return (
    typeof obj.textExplanation === "string" &&
    supplyAllocation !== undefined &&
    Array.isArray(supplyAllocation.categories) &&
    typeof supplyAllocation.totalSupply === "number" &&
    typeof supplyAllocation.tokenTicker === "string" &&
    vestingSchedule !== undefined &&
    Array.isArray(vestingSchedule.dataPoints) &&
    Array.isArray(vestingSchedule.categories) &&
    meta !== undefined &&
    typeof meta.version === "string"
  )
}
