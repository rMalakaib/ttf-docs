// src/types/index.ts
// Bottom line: Single barrel of shared types—response envelope, roles/session, and thin domain models.

// ----------------------
// Core primitives
// ----------------------
export type DocumentId = string // Strapi v5 documentId (uid-like)
export type UserId = number
export type ISO8601 = string

// ----------------------
// Response envelope
// ----------------------
export type TPaginationMeta = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type TStrapiError = {
  status: number
  name: string
  message: string
  details?: Record<string, string | string[]>
}

export type TStrapiResponse<T = null> = {
  success: boolean
  data?: T
  error?: TStrapiError
  meta?: {
    pagination?: TPaginationMeta
  }
}

// ----------------------
// User & roles & session
// ----------------------
export type TRole = "authenticated" | "auditor" | "admin"

export type TSession = {
  isAuthed: boolean
  userId?: UserId
  roles: Set<TRole>
}

export type TRoleDTO = {
  id: number
  documentId: string
  name: string // e.g. "Admin"
  description?: string | null // longform description
  type: string // e.g. "admin", "auditor", "authenticated"
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601 | null
}

export type TUserDTO = {
  id: number
  documentId: string
  username: string
  email: string
  provider: string // e.g. "local", or another auth provider key
  confirmed: boolean
  blocked: boolean
  createdAt: ISO8601
  updatedAt: ISO8601
  publishedAt?: ISO8601 | null // Strapi may omit or return null
  telegramHandle: string
  isNotificationsMuted: boolean
  role?: Set<TRoleDTO>
}

export type TUserLogin = {
  id: number
  documentId: string
  username: string
  email: string
  provider: string // e.g. "local"
  confirmed: boolean
  blocked: boolean
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
  publishedAt: string // ISO 8601
  telegramHandle: string
  isNotificationsMuted: boolean
}

export type TLogin = {
  jwt: string
  user: Set<TUserLogin>
}

// ----------------------
// Domain shapes (thin v0 stubs; expand as you wire endpoints)
// ----------------------

export type TProject = {
  id: number
  documentId: string
  slug: string
  domain: string
  createdAt: string // ISO 8601
  updatedAt?: string // ISO 8601
}

export type TQuestion = {
  id: number
  documentId: string
  order?: number
  prompt?: string
  guidanceMarkdown?: string
  maxScore?: number
  example?: string | null
  createdAt?: string // ISO
  updatedAt?: string // ISO
  publishedAt?: string // ISO
  modelPrompt?: string | null
  header?: string
  subheader?: string | null
  questionType?: string | null
}

export type TFilingFull = {
  id: number
  documentId: string
  slug: string
  filingStatus: string
  firstSubmitAt: string | null
  finalizedAt: string | null
  submissionScore: number | null
  currentScore: number | null
  finalScore: number | null
  createdAt: string // ISO
  updatedAt: string // ISO
  publishedAt: string // ISO
  title: string | null
}

export type TAnswerRevision = {
  id: number
  documentId: string
  revisionIndex: number
  answerText: string
  modelPromptRaw: string | null
  modelResponseRaw: string | null
  modelScore: number | null
  modelReason: string | null
  modelSuggestion: string | null
  latencyMs: number | null
  auditorScore: number | null
  auditorReason: string | null
  auditorSuggestion: string | null
  createdAt: string // ISO
  updatedAt: string // ISO
  publishedAt: string // ISO
  isDraft: boolean
}

export type Submission = {
  documentId: DocumentId
  filingId: DocumentId
  round: number
}

export type SubmissionAnswer = {
  documentId: DocumentId
  submissionId: DocumentId
  answerRevisionId: DocumentId
}

export type QuestionLock = {
  documentId: DocumentId
  questionId: DocumentId
  ownerUserId: UserId
  expiresAt: string // ISO
}

export type ClientDocument = {
  documentId: DocumentId
  filingId: DocumentId
  kind: string
  url?: string
}

export type FrameworkFamily = { documentId: DocumentId; code: string }
export type FrameworkVersion = { documentId: DocumentId; familyId: DocumentId; version: string }

export type ActivityLog = {
  documentId: DocumentId
  actorUserId: UserId
  event: string
  at: string // ISO
}

// Single record
// /types/index.ts
export type TSecretKey = {
  valueHash: string // sha256 hex
  // UI-only fields you might show after a rotate:
  expiresAt?: string | null // ISO string when the key will be revoked/expired
  revokedAt?: string | null // ISO string if already revoked
}

export type SecretKey = {
  documentId: DocumentId
  projectId: DocumentId
  hash: string
  label?: string
}

// wallet manager:
export interface Wallet {
  id: string
  title: string
  description: string
  address: string
  chain: string // Added chain field for blockchain network
}

export interface WalletManagerData {
  wallets: Wallet[]
}
