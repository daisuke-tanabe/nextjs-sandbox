# ====================
# Vercel
# ====================
variable "vercel_api_token" {
  description = "Vercel API Token"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Vercel Team ID (optional, for team projects)"
  type        = string
  default     = null
}

variable "project_name" {
  description = "プロジェクト名"
  type        = string
}

variable "github_repository" {
  description = "GitHubリポジトリ（owner/repo 形式）"
  type        = string
}

variable "app_url" {
  description = "アプリケーションURL（本番環境）"
  type        = string
  default     = ""
}

variable "custom_domain" {
  description = "カスタムドメイン（オプション）"
  type        = string
  default     = ""
}

# ====================
# microCMS
# ====================
variable "microcms_api_key" {
  description = "microCMS API Key"
  type        = string
  sensitive   = true
}

# ====================
# Better Auth
# ====================
variable "better_auth_secret" {
  description = "Better Auth Secret (openssl rand -base64 32 で生成)"
  type        = string
  sensitive   = true
}

# ====================
# Database (Neon)
# ====================
variable "database_url" {
  description = "Neon PostgreSQL 接続文字列"
  type        = string
  sensitive   = true
}

# ====================
# Google OAuth
# ====================
variable "google_client_id" {
  description = "Google OAuth Client ID"
  type        = string
  sensitive   = true
}

variable "google_client_secret" {
  description = "Google OAuth Client Secret"
  type        = string
  sensitive   = true
}

# ====================
# Passkey
# ====================
variable "passkey_rp_id" {
  description = "Passkey Relying Party ID (ドメイン名)"
  type        = string
}

variable "passkey_rp_name" {
  description = "Passkey Relying Party Name (表示名)"
  type        = string
  default     = "Media"
}
