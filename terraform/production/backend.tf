terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "kevin-laravel-production/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}
