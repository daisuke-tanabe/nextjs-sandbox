terraform {
  required_version = ">= 1.14.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  profile = var.aws_profile
  region = var.aws_region
}

# S3バケット
resource "aws_s3_bucket" "static_site" {
  bucket = var.bucket_name

  tags = {
    Name        = var.bucket_name
    Environment = var.environment
  }
}

# バケット所有権の設定
resource "aws_s3_bucket_ownership_controls" "static_site" {
  bucket = aws_s3_bucket.static_site.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# パブリックアクセスブロックの設定（静的サイト用に許可）
resource "aws_s3_bucket_public_access_block" "static_site" {
  bucket = aws_s3_bucket.static_site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 静的サイトホスティング設定
resource "aws_s3_bucket_website_configuration" "static_site" {
  bucket = aws_s3_bucket.static_site.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# サーバーサイド暗号化設定
resource "aws_s3_bucket_server_side_encryption_configuration" "static_site" {
  bucket = aws_s3_bucket.static_site.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# バケットポリシー（パブリック読み取りを許可）
resource "aws_s3_bucket_policy" "static_site" {
  bucket = aws_s3_bucket.static_site.id

  depends_on = [
    aws_s3_bucket_public_access_block.static_site,
    aws_s3_bucket_ownership_controls.static_site,
  ]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.static_site.arn}/*"
      }
    ]
  })
}

# ビルド成果物をS3にアップロード
resource "aws_s3_object" "static_files" {
  for_each = { for f in fileset(var.build_output_dir, "**/*") : f => f if !can(regex("/$", f)) }

  bucket        = aws_s3_bucket.static_site.id
  key           = each.value
  source        = "${var.build_output_dir}/${each.value}"
  etag          = filemd5("${var.build_output_dir}/${each.value}")
  content_type  = lookup(local.content_types, try(regex("\\.[^.]+$", each.value), ""), "application/octet-stream")
  cache_control = lookup(local.cache_controls, try(regex("\\.[^.]+$", each.value), ""), "max-age=31536000")
}

locals {
  content_types = {
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".eot"  = "application/vnd.ms-fontobject"
    ".txt"  = "text/plain; charset=utf-8"
    ".xml"  = "application/xml; charset=utf-8"
    ".webp" = "image/webp"
    ".avif" = "image/avif"
    ".map"  = "application/json"
  }

  cache_controls = {
    ".html" = "no-cache, no-store, must-revalidate"
    ".json" = "no-cache, no-store, must-revalidate"
    ".js"   = "public, max-age=31536000, immutable"
    ".mjs"  = "public, max-age=31536000, immutable"
    ".css"  = "public, max-age=31536000, immutable"
    ".png"  = "public, max-age=31536000, immutable"
    ".jpg"  = "public, max-age=31536000, immutable"
    ".jpeg" = "public, max-age=31536000, immutable"
    ".gif"  = "public, max-age=31536000, immutable"
    ".svg"  = "public, max-age=31536000, immutable"
    ".ico"  = "public, max-age=31536000, immutable"
    ".woff" = "public, max-age=31536000, immutable"
    ".woff2"= "public, max-age=31536000, immutable"
    ".webp" = "public, max-age=31536000, immutable"
    ".avif" = "public, max-age=31536000, immutable"
  }
}
