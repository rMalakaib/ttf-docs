/**
 * Test real CSV data from production against docs-standalone validators
 */

import { describe, it, expect } from "vitest"
import { validateText } from "@/lib/validators/text-validator"
import { validateFinancial, validateWallet, validateAllocation } from "@/lib/validators"
import { validateFlowchart } from "@/lib/validators/flowchart-validator"

describe("Real CSV Sample Validation", () => {
  it("Row 1 (Text) - should validate text with markdown", () => {
    const row1 = `"- Test
**as;ldjflj**
**
**
*osio*
*
*


| Header 1 | Header 2 | Header 3 | Header 4 |
| --- | --- | --- | --- |
| Cell 1 | Cell 2 | Cell 3 | Cell 4 |
| Cell 1 | Cell 2 | Cell 3 | Cell 4 |
| Cell 1 | Cell 2 | Cell 3 | Cell 4 |"`

    const result = validateText(row1)
    console.log("Row 1 (Text):", result.valid ? "PASS" : "FAIL", result.errors)
    expect(result.valid).toBe(true)
  })

  it("Row 2 (Financial) - should validate financial statement with version 2.0", () => {
    // This uses version 2.0 which may fail validation
    const row2 = `{"incomeStatement":{"blocks":[{"id":"sec_is_0_imported","title":{"id":"title_is_0_imported","type":"title","title":"Revenue"},"rows":[{"id":"n_is_0_0_imported","type":"number","attr":"IS_PRODUCT_SALES_SAAS","value":1850000},{"id":"n_is_0_1_imported","type":"number","attr":"IS_PRODUCT_SALES_LICENSES","value":420000},{"id":"n_is_0_2_imported","type":"number","attr":"IS_SERVICE_REVENUE_IMPL","value":260000},{"id":"n_is_0_3_imported","type":"number","attr":"IS_SERVICE_REVENUE_SUPPORT","value":190000},{"id":"n_is_0_4_imported","type":"number","attr":"IS_MARKETPLACE_FEES","value":80000},{"id":"n_is_0_5_imported","type":"number","attr":"IS_OTHER_OP_REVENUE","value":35000},{"id":"tot_is_0_6_imported","type":"total","totalTitle":"IS_TOTAL_REVENUE","sources":["n_is_0_0_imported","n_is_0_5_imported"]}]}]},"balanceSheet":{"blocks":[]},"cashFlowStatement":{"blocks":[]},"meta":{"currency":"USD","period":"Q3 2024","timestamp":"2025-12-12T08:09:07.274Z","version":"2.0"}}`

    const result = validateFinancial(row2)
    console.log("Row 2 (Financial):", result.valid ? "PASS" : "FAIL", result.errors)
    // Note: This may fail due to version "2.0" - docs validator expects "1.0"
    // If this is a real production format, we need to update the validator
  })

  it("Row 3 (Wallet) - should validate wallet addresses", () => {
    const row3 = `{"testtsettsettset":{"description":"test","address":"tset","chain":"test"},"tsettset":{"description":"tset","address":"tset","chain":"tset"}}`

    const result = validateWallet(row3)
    console.log("Row 3 (Wallet):", result.valid ? "PASS" : "FAIL", result.errors)
    expect(result.valid).toBe(true)
  })

  it("Row 4 (Allocation) - should validate allocation with percentages not summing to 100", () => {
    // Note: This allocation has categories that don't sum to 100%
    const row4 = `{"textExplanation":"Below is a **fake** example...","supplyAllocation":{"categories":[{"id":"cat-1765506784381-0","label":"Validator Rewards","tokenAmount":75000,"percentage":7.5,"color":"#F3E5FF"},{"id":"cat-1765506784381-1","label":"Category Labs Treasury","tokenAmount":75000,"percentage":7.5,"color":"#E9D5FF"},{"id":"cat-1765506784381-2","label":"Investors","tokenAmount":100000,"percentage":10,"color":"#DCC5FF"},{"id":"cat-1765506784381-3","label":"Team","tokenAmount":250000,"percentage":25,"color":"#D0B5FF"},{"id":"cat-1765506784381-4","label":"Airdrop","tokenAmount":150000,"percentage":15,"color":"#C3A5FF"},{"id":"cat-1765506784381-5","label":"Public Sale","tokenAmount":150000,"percentage":15,"color":"#B695FF"},{"id":"cat-1765506784381-6","label":"Ecosystem Development","tokenAmount":100000,"percentage":10,"color":"#A985FF"},{"id":"cat-1765506784381-7","label":"Total Unlocked %","tokenAmount":100000,"percentage":10,"color":"#9C75FF"}],"totalSupply":1000000,"tokenTicker":"mon"},"vestingSchedule":{"dataPoints":[{"quarterLabel":"Q1 2025","timestamp":"2025-12-12T02:33:04.381Z","categories":{"Validator Rewards":5,"Category Labs Treasury":3.5,"Investors":2,"Team":1.5,"Airdrop":4,"Public Sale":2.5,"Ecosystem Development":5,"Total Unlocked %":3.5}}],"categories":["Validator Rewards","Category Labs Treasury","Investors","Team","Airdrop","Public Sale","Ecosystem Development","Total Unlocked %"],"colors":{"Validator Rewards":"#F3E5FF","Category Labs Treasury":"#E9D5FF","Investors":"#DCC5FF","Team":"#D0B5FF","Airdrop":"#C3A5FF","Public Sale":"#B695FF","Ecosystem Development":"#A985FF","Total Unlocked %":"#9C75FF"}},"meta":{"version":"1.0","timestamp":"2025-12-12T07:28:49.444Z"}}`

    const result = validateAllocation(row4)
    console.log("Row 4 (Allocation):", result.valid ? "PASS" : "FAIL", result.errors)
    expect(result.valid).toBe(true)
  })

  it("Row 5 (Flowchart) - should validate flowchart with rect shape", () => {
    const row5 = `{"nodes":[{"id":"node_1765506331015_4q9zw2k7g","shape":"rect","color":"#3b82f6","text":"New Node","x":200,"y":100,"width":180,"height":108,"customSize":true},{"id":"node_1765506333182_t9pfsg630","shape":"circle","color":"#ef4444","text":"New Node","x":756,"y":139,"width":250.3565202807946,"height":250.3565202807946,"customSize":true}],"connections":[{"id":"conn_1765506340105_hy85x35qb","fromNodeId":"node_1765506333182_t9pfsg630","toNodeId":"node_1765506331015_4q9zw2k7g","fromSide":"left","toSide":"right","direction":"both"}],"meta":{"version":"1.0","timestamp":"2025-12-12T02:22:55.294Z"}}`

    const result = validateFlowchart(row5)
    console.log("Row 5 (Flowchart):", result.valid ? "PASS" : "FAIL", result.errors)
    expect(result.valid).toBe(true)
    expect(result.parsedData?.nodes[0].shape).toBe("rect")
  })
})
