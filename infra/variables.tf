variable "aws_profile" {
  description = "AWSプロファイル"
  type        = string
  default     = "default"
}

variable "aws_region" {
  description = "AWSリージョン"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "プロジェクト名（リソース命名に使用）"
  type        = string
}

variable "bucket_name" {
  description = "S3バケット名"
  type        = string
}

variable "environment" {
  description = "環境名（dev, staging, prod など）"
  type        = string
  default     = "dev"
}

variable "github_repository" {
  description = "GitHubリポジトリ（owner/repo 形式）"
  type        = string
}

variable "create_oidc_provider" {
  description = "OIDC Providerを新規作成するかどうか（既に存在する場合はfalse）"
  type        = bool
  default     = true
}
