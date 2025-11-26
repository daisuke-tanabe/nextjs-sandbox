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
```