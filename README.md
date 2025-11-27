# nextjs-sandbox

## docs

- docs @/docs/**/*.md

## terraform

```
cd infra

# terraform.tfvars を作成
cp terraform.tfvars.example terraform.tfvars
# bucket_name を編集（グローバルでユニークな名前に変更）

# Next.js をビルド（static export）
cd .. && npm run build
cd infra

# Terraform 初期化
terraform init

# プラン確認
terraform plan

# 適用
terraform apply

# GitHub リポジトリの Secrets に追加
AWS_ROLE_ARN: terraform output github_actions_role_arn の出力値
S3_BUCKET_NAME: terraform output bucket_name の出力値
```