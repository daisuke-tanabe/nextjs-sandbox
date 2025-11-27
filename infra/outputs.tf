output "bucket_name" {
  description = "S3バケット名"
  value       = aws_s3_bucket.static_site.id
}

output "bucket_arn" {
  description = "S3バケットのARN"
  value       = aws_s3_bucket.static_site.arn
}

output "cloudfront_distribution_id" {
  description = "CloudFrontディストリビューションID"
  value       = aws_cloudfront_distribution.static_site.id
}

output "cloudfront_domain_name" {
  description = "CloudFrontドメイン名"
  value       = aws_cloudfront_distribution.static_site.domain_name
}

output "website_url" {
  description = "静的サイトのURL（CloudFront経由）"
  value       = "https://${aws_cloudfront_distribution.static_site.domain_name}"
}

output "github_actions_role_arn" {
  description = "GitHub Actions用IAMロールのARN（GitHub Secretsに設定）"
  value       = aws_iam_role.github_actions.arn
}
