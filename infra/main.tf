terraform {
  required_version = ">= 1.14.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id
}

# Vercel Project
resource "vercel_project" "main" {
  name      = var.project_name
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = var.github_repository
  }

  build_command    = "pnpm build"
  install_command  = "pnpm install"
  output_directory = ".next"

  environment = [
    # Public
    {
      key    = "NEXT_PUBLIC_APP_URL"
      value  = var.app_url
      target = ["production", "preview", "development"]
    },
    # microCMS
    {
      key    = "MICROCMS_API_KEY"
      value  = var.microcms_api_key
      target = ["production", "preview", "development"]
    },
    # Better Auth
    {
      key    = "BETTER_AUTH_SECRET"
      value  = var.better_auth_secret
      target = ["production", "preview", "development"]
    },
    {
      key    = "BETTER_AUTH_URL"
      value  = var.app_url
      target = ["production", "preview", "development"]
    },
    # Database (Neon)
    {
      key    = "DATABASE_URL"
      value  = var.database_url
      target = ["production", "preview", "development"]
    },
    # Google OAuth
    {
      key    = "GOOGLE_CLIENT_ID"
      value  = var.google_client_id
      target = ["production", "preview", "development"]
    },
    {
      key    = "GOOGLE_CLIENT_SECRET"
      value  = var.google_client_secret
      target = ["production", "preview", "development"]
    },
    # Passkey
    {
      key    = "PASSKEY_RP_ID"
      value  = var.passkey_rp_id
      target = ["production", "preview", "development"]
    },
    {
      key    = "PASSKEY_RP_NAME"
      value  = var.passkey_rp_name
      target = ["production", "preview", "development"]
    },
  ]
}

# Production Domain (optional)
resource "vercel_project_domain" "main" {
  count = var.custom_domain != "" ? 1 : 0

  project_id = vercel_project.main.id
  domain     = var.custom_domain
}
