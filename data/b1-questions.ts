import type { QuestionType } from "@/lib/csv-ingress/types"

export interface B1Question {
  order: number
  title: string
  section: string
  questionType: QuestionType
  required: boolean
  instructions: string
}

export const B1_QUESTIONS: B1Question[] = [
  {
    order: 1,
    title: "Description of Project",
    section: "Project & Team",
    questionType: "text",
    required: true,
    instructions: `Provide a concise narrative that clearly states:
- (a) Problem the project solves — the problem the project is solving,
- (b) Operational priorities — Provide a high-level description of how the project expects to support ongoing development and operations over time
- (c) High-level project overview — how the project works at a high level,
- (d) Primary token functions — the primary functions of the token (e.g. gov participation),
- (e) Control surface reliance — if any, briefly describe the anticipated or possible evolution of the protocol's governance/control model,`
  },
  {
    order: 2,
    title: "Known Project Team & Investors",
    section: "Project & Team",
    questionType: "text",
    required: true,
    instructions: `For each existing entity: Labs/DevCo (e.g., Founder, CEO, CTO, COO), Foundation (e.g., President, Executive Director, CFO, COO), and DAO / onchain governance leadership (if applicable) list the:
- (a) full names,
- (b) official titles,
- (c) and prior experience of key team members.
- For any non-existent entity, explicitly mention it does not exist. External links may be included but they will not factor into the score.

Use tables for each entity type:
| Full Name | Official Title | Prior Experience |
| --- | --- | --- |`
  },
  {
    order: 3,
    title: "DAO Structure",
    section: "Project & Team",
    questionType: "text",
    required: true,
    instructions: `Provide a structured description of the DAO's governance, powers, and economic rights. If a DAO does not exist, state so. Address the lettered items below:
- (a) IP ownership & control — State what IP the DAO owns or controls (e.g., codebases/repos, trademarks/brands). Note any license if relevant.
- (b) Contract/admin powers — List on-chain or administrative authorities and limits: pause/upgrade roles (e.g., multisig pause), governance-executor authorities, and the method of authority for each (e.g., veto, majority, super-majority).
- (c) Locked-token rights (conditional) — If locking/staking for additional rights exists, explain the additional rights and what tokenholders can and cannot decide. If no locking mechanism exists, leave absent.
- (d) Value accrual & holder rights — If any, describe the current rights of tokenholders over revenue distribution and the treasury.
- (e) Dissolution authority — State who can dissolve/wind up the DAO and by what mechanism (e.g., on-chain vote threshold, board resolution of a legal wrapper).`
  },
  {
    order: 4,
    title: "Primary Foundation and Dev Co",
    section: "Project & Team",
    questionType: "text",
    required: true,
    instructions: `For each entity — Primary Foundation and Primary DevCo — do the following independently. If an entity does not exist, state that explicitly.
- (a) Entity — type and jurisdiction.
- (b) IP ownership & control — what IP the entity owns/controls (repos/code, trademarks/brand; license optional) and an explanation of any subsidiary entities.
- (c) Powers over DAO/treasury — If any, describe the current powers over DAO governance/treasury and the method/threshold (veto/majority/super-majority, etc.).
- (d) Powers over DevCo/Foundation — explain whether the DevCo can exert direct or indirect influence over decision-making of the foundation and vice versa.
- (e) Contract/admin powers — pause/upgrade/governance-executor authorities and the method/threshold for each (e.g., veto/majority/super-majority; "3/5 multisig").

Definitions: The primary Foundation and DevCo can be explained as those entities which are directly involved in the issuance of the native token at launch.`
  },
  {
    order: 5,
    title: "Initial Allocation",
    section: "Token Supply & Allocations",
    questionType: "allocation-builder",
    required: true,
    instructions: `Disclose launch and initial supply details in a single initial allocation schedule covering the token's launch. Include:
- (a) Launch supply totals — the total number of tokens issued at launch, the total number of tokens locked at launch, and the total number of tokens unlocked at launch;
- (b) Recipient categories & use of funds — the recipient categories with brief explanations as to how the category will use the tokens so an auditor can distinguish each bucket;
- (c) Initial price per token — the expected initial price per token;
- (d) Ticker / market symbol — the ticker/market symbol;
- (e) Total supply & supply regime — the total supply and whether the supply is fixed (if not explain inflation rate or deflation rate);
- (f) Initial vesting / release schedules — the initial vesting/release schedules (identify which categories/recipients are subject to vesting and the high-level timing logic);`
  },
  {
    order: 6,
    title: "Airdrop Process",
    section: "Token Supply & Allocations",
    questionType: "text",
    required: true,
    instructions: `If the project has planned but not yet airdropped, it must:
- (a) commit to publish, in a public channel and provide to Blockworks quarterly a recipient wallet list until the initial TGE airdrop is fully completed,
- (b) Generally state the possible target user segments (e.g., "stakers of X," "Aave users") and the allocation method (e.g., proportional to ve-balance or net position).

If the project has already airdropped, it must:
- (a) For executed airdrops, point to an per-address source such as CSV/TSV/JSON files, a Dune table, a full Merkle dump, GitHub repo files embedding per-address allocations, or RPC endpoints that expose claim/amount data; explorer links alone don't count.
- (b) Clearly state covered user segments (e.g., "stakers of X," "Aave users") and the allocation method (e.g., proportional to ve-balance or net position).

If the project does not plan to do an airdrop for TGE, it must:
- (a) If no airdrop has ever been conducted, say so plainly ("We have never conducted an airdrop to date and do not plan to execute one").`
  },
  {
    order: 7,
    title: "Market Maker Agreements & Deals",
    section: "Transactions & Market Structures",
    questionType: "text",
    required: true,
    instructions: `Projects must disclose all material terms of market-making arrangements that affect token liquidity. If the project has no agreements or deals with market makers, state that explicitly; doing so earns full credit. For each market maker, include in a table:
- (a) Market maker's name — the market maker's name;
- (b) Token allocation or loaned amount — the token allocation or loaned amount as a percentage of total supply;
- (c) Duration/term of agreement — the duration/term of the agreement; and, where applicable,
- (d) Name of agreement structure — label the financial vehicle being used in the agreement (i.e. loan, option/call, retainer model) without describing trading strategy or expected outcomes.

| Market Maker Name | Token Allocation Committed | Term Duration | Structure Name |
| --- | --- | --- | --- |`
  },
  {
    order: 8,
    title: "CEX / DEX Agreements & Deals",
    section: "Transactions & Market Structures",
    questionType: "text",
    required: true,
    instructions: `Projects must disclose all material terms of centralized or decentralized exchange listings that affect token liquidity. For each listing, include in a table:
- (a) Exchange name / DEX pool — the exchange name (and, for DEX, the specific pool/pair);
- (b) Token allocation for listing — the token allocation supplied or committed for listing as a percentage of total supply;
- (c) Term Duration — the duration/term of any listing lockups, liquidity, or incentive programs; and, where applicable,
- (d) Native-token listing fees — whether any listing fees were paid in native tokens, with amounts (tokens or % of supply), recipients, and any vesting or lock terms tied to the partnership.

If the project has no agreements or deals with CEX or DEX, state that explicitly; doing so earns full credit. If no native-token listing fees were paid, state that explicitly.

| Exchange Name | Token Allocation Committed | Term Duration | Native Token Listing Fees |
| --- | --- | --- | --- |`
  },
  {
    order: 9,
    title: "Prior Token Sales & Fundraising",
    section: "Financial Disclosures & Risks",
    questionType: "text",
    required: true,
    instructions: `Disclose all prior token sales by the Project — including fundraising rounds, any material OTC sales to investors, and any discounted market-maker sales. For each sale, provide:
- (a) Series Name / Early-Stage Investment Instrument used (i.e. SAFT, STAMP, SAFE, SAFE+Token Warrant, etc.)
- (b) Date of sale (at least month & year).
- (c) Number of tokens sold (or % of total supply)
- (d) Vesting schedule

If no prior sales occurred, state that explicitly (e.g., "No prior fundraising, OTC, or discounted MM sales have occurred.")

| Series Name / Investment Vehicle | Date Of Sale | Number of tokens sold | Vesting Schedule |
| --- | --- | --- | --- |`
  },
  {
    order: 10,
    title: "Previous Exploits Affecting The Project",
    section: "Financial Disclosures & Risks",
    questionType: "text",
    required: true,
    instructions: `If any, list prior exploits/incidents that affected protocol funds. For each incident, provide:
- (a) Date & component affected — date (YYYY-MM or YYYY-MM-DD), chain(s)/component affected;
- (b) Exploit vector summary — plain-language summary of the exploit vector (what the hack was);
- (c) Quantified impact — quantified impact (assets/tokens affected or a clear "no loss of funds" statement);
- (d) Remediation/response taken — remediation/response taken (patches, upgrades, governance actions, compensation);
- (e) Current status — current status (resolved, in litigation, under investigation, refunded, etc.);
- (f) References (optional) — references (optional): link(s) to post-mortem/advisory/PR.

If no prior incidents, state this explicitly (e.g., "No exploits affecting tokenholders or protocol funds as of YYYY-MM-DD").`
  },
  {
    order: 11,
    title: "[OPTIONAL] Material Risk Factors",
    section: "Financial Disclosures & Risks",
    questionType: "text",
    required: false,
    instructions: `This question covers three risk categories. Address each that applies:

**A. Regulatory, Legal & Tax Risks**
- Impact of Regulatory Change on TGE and Listings
- Entity-Level Regulatory Impact
- Tokenholder Tax Treatment
- Jurisdictional & User Access Restrictions

**B. Protocol, Technology & Security Risks**
- Bugs and Design Flaws
- Security Measures & Their Limitations

**C. Token Economics, Unlocks & Incentive Risks**
- Critical Economic Assumptions
- Governance Control over Monetary Policy & Rewards`
  }
]

export const B1_SECTIONS = [
  "Project & Team",
  "Token Supply & Allocations",
  "Transactions & Market Structures",
  "Financial Disclosures & Risks"
]

export function getQuestionByOrder(order: number): B1Question | undefined {
  return B1_QUESTIONS.find(q => q.order === order)
}

export function getQuestionsBySection(section: string): B1Question[] {
  return B1_QUESTIONS.filter(q => q.section === section)
}
