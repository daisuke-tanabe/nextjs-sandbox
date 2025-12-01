output "vercel_project_id" {
  description = "Vercel Project ID"
  value       = vercel_project.main.id
}

output "vercel_deployment_url" {
  description = "Vercel デプロイURL"
  value       = "https://${var.project_name}.vercel.app"
}

output "custom_domain_url" {
  description = "カスタムドメインURL"
  value       = var.custom_domain != "" ? "https://${var.custom_domain}" : null
}
