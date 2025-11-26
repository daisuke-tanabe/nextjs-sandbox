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

variable "bucket_name" {
  description = "S3バケット名"
  type        = string
}

variable "environment" {
  description = "環境名（dev, staging, prod など）"
  type        = string
  default     = "dev"
}

variable "build_output_dir" {
  description = "アップロードするビルド成果物のディレクトリパス"
  type        = string
  default     = "../out"
}
