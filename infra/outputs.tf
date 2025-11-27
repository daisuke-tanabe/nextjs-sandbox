output "bucket_name" {
  description = "S3バケット名"
  value       = aws_s3_bucket.static_site.id
}

output "bucket_arn" {
  description = "S3バケットのARN"
  value       = aws_s3_bucket.static_site.arn
}

output "website_endpoint" {
  description = "静的サイトのエンドポイントURL"
  value       = aws_s3_bucket_website_configuration.static_site.website_endpoint
}

output "website_url" {
  description = "静的サイトのURL"
  value       = "http://${aws_s3_bucket_website_configuration.static_site.website_endpoint}"
}

output "github_actions_role_arn" {
  description = "GitHub Actions用IAMロールのARN（GitHub Secretsに設定）"
  value       = aws_iam_role.github_actions.arn
}
