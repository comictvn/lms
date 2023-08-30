variable "name" {
  description = "Name to be used on all the resources as identifier"
}

variable "cloudwatch_log_group_name" {
  description = "Name of cloudwatch log group"
}

variable "image_url" {
  description = "URL of ecr image url"
}

variable "lb_blue_arn" {
  description = "ARN of application loadbalancer"
}

variable "subnets" {
  description = "Ids of the subnets"
  default     = []
}

variable "security_groups" {
  description = "Ids of the security groups"
  default     = []
}

variable "iam_arn" {
  description = "ARN of ECS Task"
}

variable "database_password_arn" {
  description = "ARN of database password"
}

variable "database_host_arn" {
  description = "ARN of the database host"
}

variable "env" {
  description = "ENV of the application"
}

variable "redis_address_arn" {
  description = "ARN of redis"
}

variable "git_token_arn" {
  description = "Github Token ARN"
}

variable "ecs_exec_kms_arn" {
  description = "ECS KMS ARN"
}

variable "ecs_exec_s3_bucket_name" {
  description = "ECS Exec S3 bucket name"
}

variable "cloudwatch_log_group_ecs_exec_name" {
  description = "Cloudwatch log group of ecs exec"
}

variable "master_key_arn" {
  description = "Encrypted key as master key arn"
}

variable "app_key_arn" {
  description = "Encrypted key as app key arn"
}

variable "passport_private_key_arn" {
  description = "Passport private key as app key arn"
}

variable "passport_public_key_arn" {
  description = "Passport public key as app key arn"
}

variable "database_name" {
  description = "Name of database name"
}

variable "database_user" {
  description = "Name of database user"
}
