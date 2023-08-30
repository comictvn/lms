terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "kevin-laravel-development/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}
