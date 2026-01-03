// Enum definitions for all financial statement attributes

export enum IncomeStatementAttr {
  APY_VAULTS = "IS_APY_VAULTS",
  LP_FEE_INCOME = "IS_LP_FEE_INCOME",
  TOKEN_RECEIPTS_OP = "IS_TOKEN_RECEIPTS_OP",
  PROFESSIONAL_FEES = "IS_PROFESSIONAL_FEES",
  LIQUIDITY_INCENTIVES_CASH = "IS_LIQUIDITY_INCENTIVES_CASH",
  MARKETING_FEES = "IS_MARKETING_FEES",
  TOKEN_ECOSYSTEM_FEES = "IS_TOKEN_ECOSYSTEM_FEES",
  BANK_TX_FEES = "IS_BANK_TX_FEES",
  OTHER_OP_FEES = "IS_OTHER_OP_FEES",
  PROTOCOL_FAILURE_REIMBURSE = "IS_PROTOCOL_FAILURE_REIMBURSE",
  TEAM_COSTS = "IS_TEAM_COSTS",
  LEGAL_INSURANCE = "IS_LEGAL_INSURANCE",
  AUDITS = "IS_AUDITS",
  OPS_COSTS = "IS_OPS_COSTS",
  MKT_COSTS = "IS_MKT_COSTS",
  PRODUCT_ENG_COSTS = "IS_PRODUCT_ENG_COSTS",
  TRAVEL = "IS_TRAVEL",
  SALARIES = "IS_SALARIES",
  CONTRACT_LABOR = "IS_CONTRACT_LABOR",
  RECRUITING = "IS_RECRUITING",
  OFFICE = "IS_OFFICE",
  EDUCATION = "IS_EDUCATION",
  SOFTWARE_HOSTING = "IS_SOFTWARE_HOSTING",
  TRAVEL_MEALS = "IS_TRAVEL_MEALS",
  ADVERTISING_MKTG = "IS_ADVERTISING_MKTG",
  TX_FEES = "IS_TX_FEES",
  INTEREST_INCOME = "IS_INTEREST_INCOME",
  INTEREST_EXPENSE = "IS_INTEREST_EXPENSE",
  REALIZED_DA = "IS_REALIZED_DA",
  UNREALIZED_DA = "IS_UNREALIZED_DA",
  OTHER_OP_INCOME = "IS_OTHER_OP_INCOME",
  OTHER_NONOP = "IS_OTHER_NONOP",
  INCOME_TAX = "INCOME_TAX",
  KOL_EXPENSE = "KOL_EXPENSES",
  LIQUIDITY_DEALS = "TVL_DEALS",

  // === Added: generalized revenue categories ===
  REVENUE_NETWORK_FEES = "IS_REVENUE_NETWORK_FEES",
  REVENUE_STAKING_SERVICES = "IS_REVENUE_STAKING_SERVICES",
  REVENUE_GRANTS_OPERATING = "IS_REVENUE_GRANTS_OPERATING",
  REVENUE_LICENSING_IP = "IS_REVENUE_LICENSING_IP",
  REVENUE_ADVISORY = "IS_REVENUE_ADVISORY",
  REVENUE_OTHER = "IS_REVENUE_OTHER",
  GENERAL_COGS = "COGS",
  GENERAL_SG_A = "SG&A",
  GENEARL_R_D = "R&D",
  GENERAL_REVENUE = "Revenue",
  OP_EXPENSES = "OP_EXPENSES",
  SALARIES_WAGES = "SALARIES_WAGES",
  RENT_UTILITIES = "RENT_UTILITIES",
  DEPRECIATION = "DEPRECIATION",
  AMORTIZATION = "AMORTIZATION",

  // === Added: COGS breakdown ===
  COGS_INFRA_HOSTING = "IS_COGS_INFRA_HOSTING",
  COGS_ORACLES = "IS_COGS_ORACLES",
  COGS_SECURITY_MONITORING = "IS_COGS_SECURITY_MONITORING",
  COGS_THIRD_PARTY_FEES = "IS_COGS_THIRD_PARTY_FEES",
  COGS_PAYMENT_CEX = "IS_COGS_PAYMENT_CEX",

  // === Added: Opex/SG&A granularity ===
  OPEX_RD_CORE = "IS_OPEX_RD_CORE",
  OPEX_BUG_BOUNTIES_CASH = "IS_OPEX_BUG_BOUNTIES_CASH",
  OPEX_SGA_KOL = "IS_OPEX_SGA_KOL",
  OPEX_SGA_COMMUNITY_EVENTS = "IS_OPEX_SGA_COMMUNITY_EVENTS",
  OPEX_SGA_BRAND_CONTENT = "IS_OPEX_SGA_BRAND_CONTENT",
  OPEX_SGA_PR_COMMS = "IS_OPEX_SGA_PR_COMMS",
  OPEX_SGA_GNA = "IS_OPEX_SGA_GNA",
  OPEX_SGA_LEGAL_COMPLIANCE = "IS_OPEX_SGA_LEGAL_COMPLIANCE",
  OPEX_SGA_ACCOUNTING_TAX = "IS_OPEX_SGA_ACCOUNTING_TAX",
  OPEX_SGA_RECRUITING_HR = "IS_OPEX_SGA_RECRUITING_HR",
  OPEX_SGA_CUSTODY_BANKING = "IS_OPEX_SGA_CUSTODY_BANKING",

  // === Added: Ecosystem/Liquidity (cash) ===
  ECO_LIQUIDITY_DEALS_CASH = "IS_ECO_LIQUIDITY_DEALS_CASH",
  ECO_MARKET_MAKING_CASH = "IS_ECO_MARKET_MAKING_CASH",
  ECO_GRANTS_CASH = "IS_ECO_GRANTS_CASH",
  ECO_PARTNERSHIPS_CASH = "IS_ECO_PARTNERSHIPS_CASH",

  // === Added: Non-cash expenses ===
  NONCASH_TOKEN_COMP = "IS_NONCASH_TOKEN_COMP",
  NONCASH_TOKEN_PARTNER_INCENTIVES = "IS_NONCASH_TOKEN_PARTNER_INCENTIVES",
  NONCASH_TOKEN_WARRANT_AMORT = "IS_NONCASH_TOKEN_WARRANT_AMORT",
  NONCASH_DA = "IS_NONCASH_DA", // Depreciation & Amortization (non-token)

  // === Added: Other income/expense granularity ===
  OTHER_FX_GAIN_LOSS = "IS_OTHER_FX_GAIN_LOSS",

  // === Added: SaaS/Traditional business labels ===
  COMPANY = "IS_COMPANY",
  FISCAL_YEAR = "IS_FISCAL_YEAR",
  PRODUCT_SALES_SAAS = "IS_PRODUCT_SALES_SAAS",
  PRODUCT_SALES_LICENSES = "IS_PRODUCT_SALES_LICENSES",
  SERVICE_REVENUE_IMPL = "IS_SERVICE_REVENUE_IMPL",
  SERVICE_REVENUE_SUPPORT = "IS_SERVICE_REVENUE_SUPPORT",
  MARKETPLACE_FEES = "IS_MARKETPLACE_FEES",
  OTHER_OP_REVENUE = "IS_OTHER_OP_REVENUE",
  HOSTING_INFRA = "IS_HOSTING_INFRA",
  THIRD_PARTY_API = "IS_THIRD_PARTY_API",
  CUSTOMER_SUPPORT_COGS = "IS_CUSTOMER_SUPPORT_COGS",
  PAYMENT_PROCESSING = "IS_PAYMENT_PROCESSING",
  AMORT_CAP_SOFTWARE = "IS_AMORT_CAP_SOFTWARE",
  SALARIES_RD = "IS_SALARIES_RD",
  SALARIES_GA = "IS_SALARIES_GA",
  SALARIES_SM = "IS_SALARIES_SM",
  EMPLOYEE_BENEFITS = "IS_EMPLOYEE_BENEFITS",
  OFFICE_REMOTE_STIPENDS = "IS_OFFICE_REMOTE_STIPENDS",
  MARKETING_PAID_ADS = "IS_MARKETING_PAID_ADS",
  MARKETING_EVENTS = "IS_MARKETING_EVENTS",
  PROF_FEES_LEGAL = "IS_PROF_FEES_LEGAL",
  PROF_FEES_ACCOUNTING = "IS_PROF_FEES_ACCOUNTING",
  SOFTWARE_TOOLS_OPEX = "IS_SOFTWARE_TOOLS_OPEX",
  TRAVEL_ENTERTAINMENT = "IS_TRAVEL_ENTERTAINMENT",
  DA_OPEX = "IS_DA_OPEX",
  OTHER_OP_EXPENSES = "IS_OTHER_OP_EXPENSES",
  FV_ADJ_INVESTMENTS = "IS_FV_ADJ_INVESTMENTS",
  INCOME_TAX_EXP = "IS_INCOME_TAX_EXP", // Income Tax Expense as a number row
}

export enum IncomeStatementTotal {
  TOTAL_INCOME = "IS_TOTAL_INCOME",
  PRE_TAX_INCOME = "Pre-tax income",
  TOTAL_EXPENSES = "IS_TOTAL_EXPENSES",
  TOTAL_OTHER_INCOME_EXPENSE = "IS_TOTAL_OTHER_INCOME_EXPENSE",
  GROSS_PROFIT = "IS_GROSS_PROFIT",
  OPERATING_INCOME_LOSS = "IS_OPERATING_INCOME_LOSS",
  EBITDA = "IS_EBITDA",
  EBIT = "IS_EBIT",
  NET_EARNINGS = "IS_NET_EARNINGS",

  // === Added: more common headings ===
  TOTAL_REVENUE = "IS_TOTAL_REVENUE",
  NET_INCOME_LOSS = "IS_NET_INCOME_LOSS",

  // === Added: SaaS/Traditional business totals ===
  TOTAL_COGS = "IS_TOTAL_COGS",
  TOTAL_OP_EXPENSES = "IS_TOTAL_OP_EXPENSES",
  OPERATING_INCOME = "IS_OPERATING_INCOME",
  TOTAL_OTHER_INC_EXP = "IS_TOTAL_OTHER_INC_EXP",
  INCOME_BEFORE_TAXES = "IS_INCOME_BEFORE_TAXES",
  INCOME_TAX_EXPENSE = "IS_INCOME_TAX_EXPENSE",
}

export enum BalanceSheetAttr {
  CASH_EQ = "BS_CASH_EQ",
  DIGITAL_ASSETS_OFFCHAIN = "BS_DIGITAL_ASSETS_OFFCHAIN",
  EARMARKED_BASE_EXPANSION = "BS_EARMARKED_BASE_EXPANSION",
  LIQUIDITY_PROVISION_OFFCHAIN = "BS_LIQUIDITY_PROVISION_OFFCHAIN",
  LOANS_RECEIVABLE = "BS_LOANS_RECEIVABLE",
  PREPAIDS = "BS_PREPAIDS",
  USDC = "BS_USDC",
  PROPOSAL_ASSETS = "BS_PROPOSAL_ASSETS",
  TOKEN_HOLDINGS_CUR = "BS_TOKEN_HOLDINGS_CUR",
  OTHER_CURRENT_ASSETS = "BS_OTHER_CURRENT_ASSETS",
  TOKEN_HOLDINGS_LT = "BS_TOKEN_HOLDINGS_LT",
  METEORA_POSITION_LT = "BS_METEORA_POSITION_LT",
  OTHER_LT_ASSETS = "BS_OTHER_LT_ASSETS",
  AP = "BS_AP",
  ACCRUED_LIAB = "BS_ACCRUED_LIAB",
  ACCRUED_OTHER = "BS_ACCRUED_OTHER",
  DEFERRED_REVENUE = "BS_DEFERRED_REVENUE",
  DEFERRED_TOKEN_GRANTS = "BS_DEFERRED_TOKEN_GRANTS",
  SAFT_WARRANT = "BS_SAFT_WARRANT",
  BANK_OVERDRAFT = "BS_BANK_OVERDRAFT",
  LOANS_ST = "BS_LOANS_ST",
  LOANS_LT = "BS_LOANS_LT",
  TAXES_PAYABLE = "BS_TAXES_PAYABLE",
  OTHER_LIAB = "BS_OTHER_LIAB",
  TREASURY_TOKENS = "BS_TREASURY_TOKENS",
  EQUITY_ISSUANCE_COSTS = "BS_EQUITY_ISSUANCE_COSTS",
  MEMBERS_EQUITY = "BS_MEMBERS_EQUITY",
  AOCI = "BS_AOCI",
  RETAINED_EARNINGS = "BS_RETAINED_EARNINGS",
  OTHER_RESERVES = "BS_OTHER_RESERVES",
  TOKEN_HOLDINGS_BY_TICKER = "BS_TOKEN_HOLDINGS_BY_TICKER",

  // === Added: missing asset categories ===
  ST_INVESTMENTS_OFFCHAIN = "BS_ST_INVESTMENTS_OFFCHAIN",
  AR = "BS_AR",
  DEPOSITS_RETAINERS = "BS_DEPOSITS_RETAINERS",
  POL_OFFCHAIN = "BS_POL_OFFCHAIN",
  INTANGIBLES = "BS_INTANGIBLES",

  // === Added: equity granularity ===
  EQUITY_TREASURY_STOCK = "BS_EQUITY_TREASURY_STOCK",
  EQUITY_FOUNDATION_CAPITAL = "BS_EQUITY_FOUNDATION_CAPITAL",
  ACCUMULATED_SURPLUS_DEFICIT = "BS_ACCUMULATED_SURPLUS_DEFICIT",

  // === Added: SaaS/Traditional business labels ===
  COMPANY = "BS_COMPANY",
  AS_OF_DATE = "BS_AS_OF_DATE",
  RESTRICTED_CASH = "BS_RESTRICTED_CASH",
  AR_NET = "BS_AR_NET",
  PPE_NET = "BS_PPE_NET",
  CAP_SOFTWARE_NET = "BS_CAP_SOFTWARE_NET",
  ROU_ASSETS_OP_LEASES = "BS_ROU_ASSETS_OP_LEASES",
  LT_INVESTMENTS = "BS_LT_INVESTMENTS",
  OTHER_NONCURRENT_ASSETS = "BS_OTHER_NONCURRENT_ASSETS",
  ACCRUED_EXPENSES = "BS_ACCRUED_EXPENSES",
  DEFERRED_REV_CURRENT = "BS_DEFERRED_REV_CURRENT",
  CURRENT_LEASE_LIAB = "BS_CURRENT_LEASE_LIAB",
  CURRENT_DEBT = "BS_CURRENT_DEBT",
  LT_DEBT = "BS_LT_DEBT",
  LEASE_LIAB_NONCURRENT = "BS_LEASE_LIAB_NONCURRENT",
  DEFERRED_REV_NONCURRENT = "BS_DEFERRED_REV_NONCURRENT",
  OTHER_NONCURRENT_LIAB = "BS_OTHER_NONCURRENT_LIAB",
  COMMON_STOCK = "BS_COMMON_STOCK",
  APIC = "BS_APIC",
  ACCUMULATED_DEFICIT = "BS_ACCUMULATED_DEFICIT",
}

export enum BalanceSheetTotal {
  TOTAL_CURRENT_ASSETS = "BS_TOTAL_CURRENT_ASSETS",
  TOTAL_LT_ASSETS = "BS_TOTAL_LT_ASSETS",
  TOTAL_ASSETS = "BS_TOTAL_ASSETS",
  TOTAL_CURRENT_LIAB = "BS_TOTAL_CURRENT_LIAB",
  TOTAL_LT_LIAB = "BS_TOTAL_LT_LIAB",
  TOTAL_LIAB = "BS_TOTAL_LIAB",
  TOTAL_EQUITY = "BS_TOTAL_EQUITY",
  TOTAL_LIAB_EQUITY = "BS_TOTAL_LIAB_EQUITY",
  NET_FINANCIAL_POSITION = "BS_NET_FINANCIAL_POSITION",

  // === Added: SaaS/Traditional business totals ===
  TOTAL_NONCURRENT_ASSETS = "BS_TOTAL_NONCURRENT_ASSETS",
  TOTAL_NONCURRENT_LIAB = "BS_TOTAL_NONCURRENT_LIAB",
  TOTAL_SE = "BS_TOTAL_SE",
  TOTAL_LIAB_SE = "BS_TOTAL_LIAB_SE",
}

export enum CashFlowAttr {
  NI = "CF_NI",
  CASH_RECEIPTS = "CF_CASH_RECEIPTS",
  BEGINNING_CASH_BALANCE = "CF_BEGINNING_CASH_BALANCE",
  CASH_TO_VENDORS = "CF_CASH_TO_VENDORS",
  PAYROLL_CONTRACTORS = "CF_PAYROLL_CONTRACTORS",
  KOL_PAYMENTS = "CF_KOL_PAYMENTS",
  COMMUNITY_EVENTS_CASH = "CF_COMMUNITY_EVENTS_CASH",
  LEGAL_COMPLIANCE_CASH = "CF_LEGAL_COMPLIANCE_CASH",
  LIQUIDITY_DEALS_CASH = "CF_LIQUIDITY_DEALS_CASH",
  MM_RETAINERS_CASH = "CF_MM_RETAINERS_CASH",
  GRANTS_CASH = "CF_GRANTS_CASH",
  INTEREST_RECEIVED = "CF_INTEREST_RECEIVED",
  INTEREST_PAID = "CF_INTEREST_PAID",
  TAXES_PAID = "CF_TAXES_PAID",
  OTHER_OP_CASH = "CF_OTHER_OP_CASH",
  ADJ_NET_PROPOSAL_GAIN = "CF_ADJ_NET_PROPOSAL_GAIN",
  ADJ_NET_TOKEN_LOSS = "CF_ADJ_NET_TOKEN_LOSS",
  ADJ_TOKEN_DONATIONS = "CF_ADJ_TOKEN_DONATIONS",
  ADJ_TX_FEES_WITH_TOKENS = "CF_ADJ_TX_FEES_WITH_TOKENS",
  ADJ_CONTRACTORS_WITH_TOKENS = "CF_ADJ_CONTRACTORS_WITH_TOKENS",
  DELTA_PROPOSAL_ASSETS = "CF_DELTA_PROPOSAL_ASSETS",
  DELTA_OTHER_ASSETS = "CF_DELTA_OTHER_ASSETS",
  DELTA_AP = "CF_DELTA_AP",
  NET_TOKEN_PURCHASES = "CF_NET_TOKEN_PURCHASES",
  CAPITALIZED_SOFTWARE = "CF_CAPITALIZED_SOFTWARE",
  CAPEX = "CF_CAPEX",
  CREATE_AMM_POSITION = "CF_CREATE_AMM_POSITION",
  ACQUIRE_POL_OFFCHAIN = "CF_ACQUIRE_POL_OFFCHAIN",
  PROCEEDS_INVESTMENTS = "CF_PROCEEDS_INVESTMENTS",
  OTHER_INVESTING = "CF_OTHER_INVESTING",
  TOKEN_SALE_PROCEEDS = "CF_TOKEN_SALE_PROCEEDS",
  EQUITY_CONTRIB = "CF_EQUITY_CONTRIB",
  LOAN_PROCEEDS = "CF_LOAN_PROCEEDS",
  LOAN_REPAY = "CF_LOAN_REPAY",
  REPURCHASES_CASH = "CF_REPURCHASES_CASH",
  TOKEN_ISSUANCE_FEES = "CF_TOKEN_ISSUANCE_FEES",
  OTHER_FINANCING = "CF_OTHER_FINANCING",

  // === Added: non-cash disclosures (not summed in cash) ===
  DISC_NONCASH_TOKEN_COMP = "CF_DISC_NONCASH_TOKEN_COMP",
  DISC_NONCASH_TOKEN_INCENTIVES = "CF_DISC_NONCASH_TOKEN_INCENTIVES",

  // === Added: SaaS/Traditional business labels ===
  COMPANY = "CF_COMPANY",
  FISCAL_YEAR = "CF_FISCAL_YEAR",
  DA = "CF_DA",
  STOCK_BASED_COMP = "CF_STOCK_BASED_COMP",
  NONCASH_LEASE_EXP = "CF_NONCASH_LEASE_EXP",
  FV_ADJ_INVESTMENTS = "CF_FV_ADJ_INVESTMENTS",
  CHG_AR = "CF_CHG_AR",
  CHG_PREPAIDS = "CF_CHG_PREPAIDS",
  CHG_OTHER_CURRENT_ASSETS = "CF_CHG_OTHER_CURRENT_ASSETS",
  CHG_AP = "CF_CHG_AP",
  CHG_ACCRUED = "CF_CHG_ACCRUED",
  CHG_DEFERRED_REV = "CF_CHG_DEFERRED_REV",
  CHG_OTHER_OP_LIAB = "CF_CHG_OTHER_OP_LIAB",
  PURCHASE_PPE = "CF_PURCHASE_PPE",
  CAP_SOFTWARE_COSTS = "CF_CAP_SOFTWARE_COSTS",
  PURCHASE_LT_INVESTMENTS = "CF_PURCHASE_LT_INVESTMENTS",
  PROCEEDS_SALE_INVESTMENTS = "CF_PROCEEDS_SALE_INVESTMENTS",
  PROCEEDS_COMMON_STOCK = "CF_PROCEEDS_COMMON_STOCK",
  PROCEEDS_LT_DEBT = "CF_PROCEEDS_LT_DEBT",
  PRINCIPAL_DEBT = "CF_PRINCIPAL_DEBT",
  PRINCIPAL_LEASE_LIAB = "CF_PRINCIPAL_LEASE_LIAB",
  CASH_BEGIN = "CF_CASH_BEGIN",
  CASH_END = "CF_CASH_END",
  NET_INCOME = "CF_NET_INCOME", // Net Income (separate from NI which is "Net income (loss)")
}

export enum CashFlowTotal {
  NET_CASH_OPERATING = "CF_NET_CASH_OPERATING",
  NET_CASH_INVESTING = "CF_NET_CASH_INVESTING",
  CASH_FROM_INVESTING_ACTIVITIES = "CF_CASH_FROM_INVESTING_ACTIVITIES",
  NET_CASH_FINANCING = "CF_NET_CASH_FINANCING",
  NET_CHANGE_CASH = "CF_NET_CHANGE_CASH",
  ENDING_CASH = "CF_ENDING_CASH",

  // === Added: SaaS/Traditional business totals ===
  NET_CASH_PROVIDED_OP = "CF_NET_CASH_PROVIDED_OP",
  NET_CASH_USED_INVESTING = "CF_NET_CASH_USED_INVESTING",
  NET_CASH_PROVIDED_FINANCING = "CF_NET_CASH_PROVIDED_FINANCING",
  NET_INCREASE_CASH = "CF_NET_INCREASE_CASH",
}

// Display labels for attributes
export const INCOME_STATEMENT_LABELS: Record<IncomeStatementAttr, string> = {
  [IncomeStatementAttr.GENERAL_COGS]: "COGS",
  [IncomeStatementAttr.GENERAL_SG_A]: "SG&A",
  [IncomeStatementAttr.GENEARL_R_D]: "R&D",
  [IncomeStatementAttr.GENERAL_REVENUE]: "Revenue",
  [IncomeStatementAttr.INCOME_TAX]: "Income Tax",
  [IncomeStatementAttr.KOL_EXPENSE]: "KOL Expenses",
  [IncomeStatementAttr.LIQUIDITY_DEALS]: "Liquidity deals for TVL",
  [IncomeStatementAttr.APY_VAULTS]: "APY earned on vaults",
  [IncomeStatementAttr.LP_FEE_INCOME]: "Liquidity pool fee income",
  [IncomeStatementAttr.TOKEN_RECEIPTS_OP]: "Token receipts (operating)",
  [IncomeStatementAttr.PROFESSIONAL_FEES]: "Professional fees",
  [IncomeStatementAttr.LIQUIDITY_INCENTIVES_CASH]: "Liquidity incentives spent",
  [IncomeStatementAttr.MARKETING_FEES]: "Marketing fees",
  [IncomeStatementAttr.TOKEN_ECOSYSTEM_FEES]: "Token ecosystem fees",
  [IncomeStatementAttr.BANK_TX_FEES]: "Bank and transaction fees",
  [IncomeStatementAttr.OTHER_OP_FEES]: "Other operational fees",
  [IncomeStatementAttr.PROTOCOL_FAILURE_REIMBURSE]: "Reimbursements due to protocol failure",
  [IncomeStatementAttr.TEAM_COSTS]: "Team costs",
  [IncomeStatementAttr.LEGAL_INSURANCE]: "Legal and insurance",
  [IncomeStatementAttr.AUDITS]: "Smart contract audits",
  [IncomeStatementAttr.OPS_COSTS]: "Operations costs",
  [IncomeStatementAttr.MKT_COSTS]: "Marketing costs",
  [IncomeStatementAttr.PRODUCT_ENG_COSTS]: "Product and engineering costs",
  [IncomeStatementAttr.TRAVEL]: "Travel",
  [IncomeStatementAttr.SALARIES]: "Salaries",
  [IncomeStatementAttr.CONTRACT_LABOR]: "Contract labor",
  [IncomeStatementAttr.RECRUITING]: "Recruiting",
  [IncomeStatementAttr.OFFICE]: "Office expenses",
  [IncomeStatementAttr.EDUCATION]: "Continuing education",
  [IncomeStatementAttr.SOFTWARE_HOSTING]: "Software and hosting",
  [IncomeStatementAttr.TRAVEL_MEALS]: "Travel and meals",
  [IncomeStatementAttr.ADVERTISING_MKTG]: "Advertising and marketing",
  [IncomeStatementAttr.TX_FEES]: "Transaction fees",
  [IncomeStatementAttr.INTEREST_INCOME]: "Interest income",
  [IncomeStatementAttr.INTEREST_EXPENSE]: "Interest expense",
  [IncomeStatementAttr.REALIZED_DA]: "Net realized gains on digital assets",
  [IncomeStatementAttr.UNREALIZED_DA]: "Net unrealized gains on digital assets",
  [IncomeStatementAttr.OTHER_OP_INCOME]: "Other operating income",
  [IncomeStatementAttr.OP_EXPENSES]: "Operating expenses",
  [IncomeStatementAttr.SALARIES_WAGES]: "Salaries and wages",
  [IncomeStatementAttr.RENT_UTILITIES]: "Rent and utilities",
  [IncomeStatementAttr.DEPRECIATION]: "Depreciation",
  [IncomeStatementAttr.AMORTIZATION]: "Amortization",
  [IncomeStatementAttr.COGS_INFRA_HOSTING]: "Infrastructure and hosting (COGS)",
  [IncomeStatementAttr.COGS_ORACLES]: "Oracle fees (COGS)",
  [IncomeStatementAttr.COGS_SECURITY_MONITORING]: "Security monitoring (COGS)",
  [IncomeStatementAttr.COGS_THIRD_PARTY_FEES]: "Third-party service fees (COGS)",
  [IncomeStatementAttr.COGS_PAYMENT_CEX]: "Payment processing/CEX fees (COGS)",
  [IncomeStatementAttr.OPEX_RD_CORE]: "R&D core development",
  [IncomeStatementAttr.OPEX_BUG_BOUNTIES_CASH]: "Bug bounties (cash)",
  [IncomeStatementAttr.OPEX_SGA_KOL]: "KOL expenses (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_COMMUNITY_EVENTS]: "Community & events (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_BRAND_CONTENT]: "Brand & content (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_PR_COMMS]: "PR & communications (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_GNA]: "General & administrative (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_LEGAL_COMPLIANCE]: "Legal & compliance (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_ACCOUNTING_TAX]: "Accounting & tax (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_RECRUITING_HR]: "Recruiting & HR (SG&A)",
  [IncomeStatementAttr.OPEX_SGA_CUSTODY_BANKING]: "Custody & banking (SG&A)",
  [IncomeStatementAttr.ECO_LIQUIDITY_DEALS_CASH]: "Liquidity deals (cash ecosystem)",
  [IncomeStatementAttr.ECO_MARKET_MAKING_CASH]: "Market making (cash ecosystem)",
  [IncomeStatementAttr.ECO_GRANTS_CASH]: "Grants paid (cash ecosystem)",
  [IncomeStatementAttr.ECO_PARTNERSHIPS_CASH]: "Partnerships (cash ecosystem)",
  [IncomeStatementAttr.NONCASH_TOKEN_COMP]: "Token-based compensation (non-cash)",
  [IncomeStatementAttr.NONCASH_TOKEN_PARTNER_INCENTIVES]: "Token partner incentives (non-cash)",
  [IncomeStatementAttr.NONCASH_TOKEN_WARRANT_AMORT]: "Token warrant amortization (non-cash)",
  [IncomeStatementAttr.NONCASH_DA]: "Depreciation & amortization (non-cash)",
  [IncomeStatementAttr.OTHER_FX_GAIN_LOSS]: "Foreign exchange gain/loss",

  // Pre-existing missing labels (added to fix type error)
  [IncomeStatementAttr.OTHER_NONOP]: "Other non-operating income/expense",
  [IncomeStatementAttr.REVENUE_NETWORK_FEES]: "Revenue from network fees",
  [IncomeStatementAttr.REVENUE_STAKING_SERVICES]: "Revenue from staking services",
  [IncomeStatementAttr.REVENUE_GRANTS_OPERATING]: "Revenue from operating grants",
  [IncomeStatementAttr.REVENUE_LICENSING_IP]: "Revenue from licensing IP",
  [IncomeStatementAttr.REVENUE_ADVISORY]: "Revenue from advisory services",
  [IncomeStatementAttr.REVENUE_OTHER]: "Other revenue",

  // SaaS/Traditional business labels
  [IncomeStatementAttr.COMPANY]: "Company",
  [IncomeStatementAttr.FISCAL_YEAR]: "Fiscal Year",
  [IncomeStatementAttr.PRODUCT_SALES_SAAS]: "Product Sales - SaaS Subscriptions",
  [IncomeStatementAttr.PRODUCT_SALES_LICENSES]: "Product Sales - One-time Licenses",
  [IncomeStatementAttr.SERVICE_REVENUE_IMPL]: "Service Revenue - Implementation",
  [IncomeStatementAttr.SERVICE_REVENUE_SUPPORT]: "Service Revenue - Support & Maintenance",
  [IncomeStatementAttr.MARKETPLACE_FEES]: "Marketplace Fees",
  [IncomeStatementAttr.OTHER_OP_REVENUE]: "Other Operating Revenue",
  [IncomeStatementAttr.HOSTING_INFRA]: "Hosting & Infrastructure",
  [IncomeStatementAttr.THIRD_PARTY_API]: "Third-party API Costs",
  [IncomeStatementAttr.CUSTOMER_SUPPORT_COGS]: "Customer Support (COGS)",
  [IncomeStatementAttr.PAYMENT_PROCESSING]: "Payment Processing Fees",
  [IncomeStatementAttr.AMORT_CAP_SOFTWARE]: "Amortization of Capitalized Software",
  [IncomeStatementAttr.SALARIES_RD]: "Salaries & Wages - R&D",
  [IncomeStatementAttr.SALARIES_GA]: "Salaries & Wages - G&A",
  [IncomeStatementAttr.SALARIES_SM]: "Salaries & Wages - Sales & Marketing",
  [IncomeStatementAttr.EMPLOYEE_BENEFITS]: "Employee Benefits",
  [IncomeStatementAttr.OFFICE_REMOTE_STIPENDS]: "Office & Remote Stipends",
  [IncomeStatementAttr.MARKETING_PAID_ADS]: "Marketing - Paid Ads",
  [IncomeStatementAttr.MARKETING_EVENTS]: "Marketing - Events & Conferences",
  [IncomeStatementAttr.PROF_FEES_LEGAL]: "Professional Fees - Legal",
  [IncomeStatementAttr.PROF_FEES_ACCOUNTING]: "Professional Fees - Accounting",
  [IncomeStatementAttr.SOFTWARE_TOOLS_OPEX]: "Software & Tools (Opex)",
  [IncomeStatementAttr.TRAVEL_ENTERTAINMENT]: "Travel & Entertainment",
  [IncomeStatementAttr.DA_OPEX]: "Depreciation & Amortization (Opex)",
  [IncomeStatementAttr.OTHER_OP_EXPENSES]: "Other Operating Expenses",
  [IncomeStatementAttr.FV_ADJ_INVESTMENTS]: "Fair Value Adjustment on Investments",
  [IncomeStatementAttr.INCOME_TAX_EXP]: "Income Tax Expense",
}

export const INCOME_STATEMENT_TOTAL_LABELS: Record<IncomeStatementTotal, string> = {
  [IncomeStatementTotal.TOTAL_INCOME]: "Total income",
  [IncomeStatementTotal.PRE_TAX_INCOME]: "Pre-tax income",
  [IncomeStatementTotal.TOTAL_EXPENSES]: "Total expenses",
  [IncomeStatementTotal.TOTAL_OTHER_INCOME_EXPENSE]: "Total other income/expense",
  [IncomeStatementTotal.GROSS_PROFIT]: "Gross profit",
  [IncomeStatementTotal.OPERATING_INCOME_LOSS]: "Operating income",
  [IncomeStatementTotal.EBITDA]: "EBITDA",
  [IncomeStatementTotal.EBIT]: "EBIT",
  [IncomeStatementTotal.NET_EARNINGS]: "Net earnings",
  [IncomeStatementTotal.TOTAL_REVENUE]: "Total revenue",
  [IncomeStatementTotal.NET_INCOME_LOSS]: "Net income",

  // SaaS/Traditional business totals
  [IncomeStatementTotal.TOTAL_COGS]: "Total COGS",
  [IncomeStatementTotal.TOTAL_OP_EXPENSES]: "Total Operating Expenses",
  [IncomeStatementTotal.OPERATING_INCOME]: "Operating Income",
  [IncomeStatementTotal.TOTAL_OTHER_INC_EXP]: "Total Other Income (Expense)",
  [IncomeStatementTotal.INCOME_BEFORE_TAXES]: "Income Before Taxes",
  [IncomeStatementTotal.INCOME_TAX_EXPENSE]: "Income Tax Expense",
}

export const BALANCE_SHEET_LABELS: Record<BalanceSheetAttr, string> = {
  [BalanceSheetAttr.CASH_EQ]: "Cash and cash equivalents",
  [BalanceSheetAttr.DIGITAL_ASSETS_OFFCHAIN]: "Digital assets (custodied, off-chain)",
  [BalanceSheetAttr.EARMARKED_BASE_EXPANSION]: "Assets earmarked for base expansion",
  [BalanceSheetAttr.LIQUIDITY_PROVISION_OFFCHAIN]: "Liquidity provision (off-chain)",
  [BalanceSheetAttr.LOANS_RECEIVABLE]: "Loans receivable",
  [BalanceSheetAttr.PREPAIDS]: "Prepaid expenses",
  [BalanceSheetAttr.USDC]: "USDC (current asset)",
  [BalanceSheetAttr.PROPOSAL_ASSETS]: "Proposal assets",
  [BalanceSheetAttr.TOKEN_HOLDINGS_CUR]: "Token holdings (current)",
  [BalanceSheetAttr.OTHER_CURRENT_ASSETS]: "Other current assets",
  [BalanceSheetAttr.TOKEN_HOLDINGS_LT]: "Token holdings (long-term)",
  [BalanceSheetAttr.METEORA_POSITION_LT]: "Meteora Market position (long-term)",
  [BalanceSheetAttr.OTHER_LT_ASSETS]: "Other long-term assets",
  [BalanceSheetAttr.AP]: "Accounts payable",
  [BalanceSheetAttr.ACCRUED_LIAB]: "Accrued liabilities",
  [BalanceSheetAttr.ACCRUED_OTHER]: "Accrued expenses and other liabilities",
  [BalanceSheetAttr.DEFERRED_REVENUE]: "Deferred revenue",
  [BalanceSheetAttr.DEFERRED_TOKEN_GRANTS]: "Deferred token grant liability",
  [BalanceSheetAttr.SAFT_WARRANT]: "SAFT / warrant liability",
  [BalanceSheetAttr.BANK_OVERDRAFT]: "Bank overdraft",
  [BalanceSheetAttr.LOANS_ST]: "Loans and notes payable (short-term)",
  [BalanceSheetAttr.LOANS_LT]: "Loans and notes payable (long-term)",
  [BalanceSheetAttr.TAXES_PAYABLE]: "Taxes payable",
  [BalanceSheetAttr.OTHER_LIAB]: "Other liabilities",
  [BalanceSheetAttr.TREASURY_TOKENS]: "Treasury tokens (equity)",
  [BalanceSheetAttr.EQUITY_ISSUANCE_COSTS]: "Equity issuance costs",
  [BalanceSheetAttr.MEMBERS_EQUITY]: "Members' equity / foundation capital",
  [BalanceSheetAttr.AOCI]: "Accumulated other comprehensive income",
  [BalanceSheetAttr.RETAINED_EARNINGS]: "Retained earnings",
  [BalanceSheetAttr.OTHER_RESERVES]: "Other reserves",
  [BalanceSheetAttr.TOKEN_HOLDINGS_BY_TICKER]: "Token holdings (by ticker)",

  // Added labels
  [BalanceSheetAttr.ST_INVESTMENTS_OFFCHAIN]: "Short-term investments (off-chain)",
  [BalanceSheetAttr.AR]: "Accounts receivable",
  [BalanceSheetAttr.DEPOSITS_RETAINERS]: "Deposits & retainers",
  [BalanceSheetAttr.POL_OFFCHAIN]: "Protocol-owned liquidity (off-chain custodial)",
  [BalanceSheetAttr.INTANGIBLES]: "Intangible assets (software, IP)",
  [BalanceSheetAttr.EQUITY_TREASURY_STOCK]: "Treasury token / token repurchases",
  [BalanceSheetAttr.EQUITY_FOUNDATION_CAPITAL]: "Foundation capital / contributed capital",
  [BalanceSheetAttr.ACCUMULATED_SURPLUS_DEFICIT]: "Accumulated surplus (deficit)",

  // SaaS/Traditional business labels
  [BalanceSheetAttr.COMPANY]: "Company",
  [BalanceSheetAttr.AS_OF_DATE]: "As of Date",
  [BalanceSheetAttr.RESTRICTED_CASH]: "Restricted Cash",
  [BalanceSheetAttr.AR_NET]: "Accounts Receivable, Net",
  [BalanceSheetAttr.PPE_NET]: "Property & Equipment, Net",
  [BalanceSheetAttr.CAP_SOFTWARE_NET]: "Capitalized Software, Net",
  [BalanceSheetAttr.ROU_ASSETS_OP_LEASES]: "Right-of-use Assets - Operating Leases",
  [BalanceSheetAttr.LT_INVESTMENTS]: "Long-term Investments",
  [BalanceSheetAttr.OTHER_NONCURRENT_ASSETS]: "Other Non-current Assets",
  [BalanceSheetAttr.ACCRUED_EXPENSES]: "Accrued Expenses",
  [BalanceSheetAttr.DEFERRED_REV_CURRENT]: "Deferred Revenue - Current",
  [BalanceSheetAttr.CURRENT_LEASE_LIAB]: "Current Portion of Lease Liabilities",
  [BalanceSheetAttr.CURRENT_DEBT]: "Current Portion of Debt",
  [BalanceSheetAttr.LT_DEBT]: "Long-term Debt",
  [BalanceSheetAttr.LEASE_LIAB_NONCURRENT]: "Lease Liabilities, Non-current",
  [BalanceSheetAttr.DEFERRED_REV_NONCURRENT]: "Deferred Revenue - Non-current",
  [BalanceSheetAttr.OTHER_NONCURRENT_LIAB]: "Other Non-current Liabilities",
  [BalanceSheetAttr.COMMON_STOCK]: "Common Stock",
  [BalanceSheetAttr.APIC]: "Additional Paid-in Capital",
  [BalanceSheetAttr.ACCUMULATED_DEFICIT]: "Accumulated Deficit",
}

export const BALANCE_SHEET_TOTAL_LABELS: Record<BalanceSheetTotal, string> = {
  [BalanceSheetTotal.TOTAL_CURRENT_ASSETS]: "Total current assets",
  [BalanceSheetTotal.TOTAL_LT_ASSETS]: "Total long-term assets",
  [BalanceSheetTotal.TOTAL_ASSETS]: "Total assets",
  [BalanceSheetTotal.TOTAL_CURRENT_LIAB]: "Total current liabilities",
  [BalanceSheetTotal.TOTAL_LT_LIAB]: "Total long-term liabilities",
  [BalanceSheetTotal.TOTAL_LIAB]: "Total liabilities",
  [BalanceSheetTotal.TOTAL_EQUITY]: "Total equity",
  [BalanceSheetTotal.TOTAL_LIAB_EQUITY]: "Total liabilities and equity",
  [BalanceSheetTotal.NET_FINANCIAL_POSITION]: "Net financial position",

  // SaaS/Traditional business totals
  [BalanceSheetTotal.TOTAL_NONCURRENT_ASSETS]: "Total Non-Current Assets",
  [BalanceSheetTotal.TOTAL_NONCURRENT_LIAB]: "Total Non-Current Liabilities",
  [BalanceSheetTotal.TOTAL_SE]: "Total Shareholders' Equity",
  [BalanceSheetTotal.TOTAL_LIAB_SE]: "Total Liabilities and Shareholders' Equity",
}

export const CASH_FLOW_LABELS: Record<CashFlowAttr, string> = {
  [CashFlowAttr.NI]: "Net income (loss)",
  [CashFlowAttr.CASH_RECEIPTS]: "Cash receipts from operations",
  [CashFlowAttr.BEGINNING_CASH_BALANCE]: "Beginning Cash Balance",
  [CashFlowAttr.CASH_TO_VENDORS]: "Cash paid to vendors and suppliers",
  [CashFlowAttr.PAYROLL_CONTRACTORS]: "Payroll and contractor payments",
  [CashFlowAttr.KOL_PAYMENTS]: "KOL marketing payments",
  [CashFlowAttr.COMMUNITY_EVENTS_CASH]: "Community and events (cash)",
  [CashFlowAttr.LEGAL_COMPLIANCE_CASH]: "Legal and compliance (cash)",
  [CashFlowAttr.LIQUIDITY_DEALS_CASH]: "Liquidity deals (cash for TVL)",
  [CashFlowAttr.MM_RETAINERS_CASH]: "Market-making retainers (cash)",
  [CashFlowAttr.GRANTS_CASH]: "Grants paid (cash)",
  [CashFlowAttr.INTEREST_RECEIVED]: "Interest received",
  [CashFlowAttr.INTEREST_PAID]: "Interest paid",
  [CashFlowAttr.TAXES_PAID]: "Taxes paid",
  [CashFlowAttr.OTHER_OP_CASH]: "Other operating cash",
  [CashFlowAttr.ADJ_NET_PROPOSAL_GAIN]: "Net proposal gain (non-cash adjustment)",
  [CashFlowAttr.ADJ_NET_TOKEN_LOSS]: "Net token loss (non-cash adjustment)",
  [CashFlowAttr.ADJ_TOKEN_DONATIONS]: "Token donations (non-cash adjustment)",
  [CashFlowAttr.ADJ_TX_FEES_WITH_TOKENS]: "Transaction fees paid with tokens (non-cash adjustment)",
  [CashFlowAttr.ADJ_CONTRACTORS_WITH_TOKENS]: "Contractors paid with tokens (non-cash adjustment)",
  [CashFlowAttr.DELTA_PROPOSAL_ASSETS]: "Change in proposal assets",
  [CashFlowAttr.DELTA_OTHER_ASSETS]: "Change in other assets",
  [CashFlowAttr.DELTA_AP]: "Change in accounts payable",
  [CashFlowAttr.NET_TOKEN_PURCHASES]: "Net token purchases",
  [CashFlowAttr.CAPITALIZED_SOFTWARE]: "Capitalized software and intangibles",
  [CashFlowAttr.CAPEX]: "Equipment and capital expenditures",
  [CashFlowAttr.CREATE_AMM_POSITION]: "Creation of AMM position (e.g., Meteora Market)",
  [CashFlowAttr.ACQUIRE_POL_OFFCHAIN]: "Acquisition/increase of off-chain POL positions",
  [CashFlowAttr.PROCEEDS_INVESTMENTS]: "Proceeds from sale of investments (off-chain)",
  [CashFlowAttr.OTHER_INVESTING]: "Other investing cash",
  [CashFlowAttr.TOKEN_SALE_PROCEEDS]: "Token sale proceeds (fiat received)",
  [CashFlowAttr.EQUITY_CONTRIB]: "Equity contributions",
  [CashFlowAttr.LOAN_PROCEEDS]: "Loan proceeds",
  [CashFlowAttr.LOAN_REPAY]: "Loan repayments",
  [CashFlowAttr.REPURCHASES_CASH]: "Equity or token repurchases (cash)",
  [CashFlowAttr.TOKEN_ISSUANCE_FEES]: "Token issuance fees",
  [CashFlowAttr.OTHER_FINANCING]: "Other financing cash",

  // Added labels
  [CashFlowAttr.DISC_NONCASH_TOKEN_COMP]: "Non-cash token-based compensation (disclosure)",
  [CashFlowAttr.DISC_NONCASH_TOKEN_INCENTIVES]: "Non-cash token incentives to partners (disclosure)",

  // SaaS/Traditional business labels
  [CashFlowAttr.COMPANY]: "Company",
  [CashFlowAttr.FISCAL_YEAR]: "Fiscal Year",
  [CashFlowAttr.DA]: "Depreciation & Amortization",
  [CashFlowAttr.STOCK_BASED_COMP]: "Stock-based Compensation",
  [CashFlowAttr.NONCASH_LEASE_EXP]: "Non-cash Lease Expense",
  [CashFlowAttr.FV_ADJ_INVESTMENTS]: "Fair Value Adjustment on Investments",
  [CashFlowAttr.CHG_AR]: "Accounts Receivable",
  [CashFlowAttr.CHG_PREPAIDS]: "Prepaid Expenses",
  [CashFlowAttr.CHG_OTHER_CURRENT_ASSETS]: "Other Current Assets",
  [CashFlowAttr.CHG_AP]: "Accounts Payable",
  [CashFlowAttr.CHG_ACCRUED]: "Accrued Expenses",
  [CashFlowAttr.CHG_DEFERRED_REV]: "Deferred Revenue",
  [CashFlowAttr.CHG_OTHER_OP_LIAB]: "Other Operating Liabilities",
  [CashFlowAttr.PURCHASE_PPE]: "Purchases of Property & Equipment",
  [CashFlowAttr.CAP_SOFTWARE_COSTS]: "Capitalized Software Development Costs",
  [CashFlowAttr.PURCHASE_LT_INVESTMENTS]: "Purchases of Long-term Investments",
  [CashFlowAttr.PROCEEDS_SALE_INVESTMENTS]: "Proceeds from Sale of Investments",
  [CashFlowAttr.PROCEEDS_COMMON_STOCK]: "Proceeds from Issuance of Common Stock",
  [CashFlowAttr.PROCEEDS_LT_DEBT]: "Proceeds from Long-term Debt",
  [CashFlowAttr.PRINCIPAL_DEBT]: "Principal Payments on Debt",
  [CashFlowAttr.PRINCIPAL_LEASE_LIAB]: "Principal Payments on Lease Liabilities",
  [CashFlowAttr.CASH_BEGIN]: "Cash and Cash Equivalents, Beginning of Period",
  [CashFlowAttr.CASH_END]: "Cash and Cash Equivalents, End of Period",
  [CashFlowAttr.NET_INCOME]: "Net Income",
}

export const CASH_FLOW_TOTAL_LABELS: Record<CashFlowTotal, string> = {
  [CashFlowTotal.NET_CASH_OPERATING]: "Net cash from operating activities",
  [CashFlowTotal.NET_CASH_INVESTING]: "Net cash from investing activities",
  [CashFlowTotal.CASH_FROM_INVESTING_ACTIVITIES]: "Cash from Investing Activities",
  [CashFlowTotal.NET_CASH_FINANCING]: "Net cash from financing activities",
  [CashFlowTotal.NET_CHANGE_CASH]: "Net change in cash",
  [CashFlowTotal.ENDING_CASH]: "Ending cash and cash equivalents",

  // SaaS/Traditional business totals
  [CashFlowTotal.NET_CASH_PROVIDED_OP]: "Net Cash Provided by Operating Activities",
  [CashFlowTotal.NET_CASH_USED_INVESTING]: "Net Cash Used in Investing Activities",
  [CashFlowTotal.NET_CASH_PROVIDED_FINANCING]: "Net Cash Provided by Financing Activities",
  [CashFlowTotal.NET_INCREASE_CASH]: "Net Increase (Decrease) in Cash and Cash Equivalents",
}

// Row types
export type RowType = "title" | "number" | "total"

export interface TokenHolding {
  ticker: string
  amount: number
}

export type StandardAttr = IncomeStatementAttr | BalanceSheetAttr | CashFlowAttr
export type CustomAttrTag = string // Format: "projectId:identifier"
export type AnyAttr = StandardAttr | CustomAttrTag

export interface NumberRow {
  id: string
  type: "number"
  attr: AnyAttr // Now accepts custom tags
  isCustom?: boolean // Flag to identify custom attrs
  customLabel?: string // Display label for custom attrs (cached from registry)
  value: number
  tokenHoldings?: TokenHolding[] // Only for TOKEN_HOLDINGS_BY_TICKER
}

export interface TotalRow {
  id: string
  type: "total"
  totalTitle: IncomeStatementTotal | BalanceSheetTotal | CashFlowTotal
  sources: string[] // IDs of rows to sum
  hasWarning?: boolean // True if a source was deleted
  isCustom?: boolean
  customLabel?: string
}

export interface TitleRow {
  id: string
  type: "title"
  title: string
}

export type Row = TitleRow | NumberRow | TotalRow

export interface Section {
  id: string
  title: TitleRow
  rows: Row[]
}

export interface StatementData {
  blocks: Section[]
}

export interface FinancialStatementJSON {
  incomeStatement: StatementData
  balanceSheet: StatementData
  cashFlowStatement: StatementData
  meta: {
    companyName?: string
    currency: string
    period?: string
    timestamp: string
    version: string
    customAttributes?: unknown[] // Optional custom attributes
  }
}

export type StatementType = "incomeStatement" | "balanceSheet" | "cashFlowStatement"

// Additional utility functions or types can be added here
