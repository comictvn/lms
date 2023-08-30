terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "kevin-laravel-staging/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}
