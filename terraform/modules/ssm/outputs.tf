
output "database_host_arn" {
  description = "ARN of database host"
  value       = aws_ssm_parameter.database_host.arn
}

output "database_password_arn" {
  description = "ARN of database password"
  value       = aws_ssm_parameter.database_password.arn
}

output "master_key_arn" {
  description = "ARN of rails master key"
  value       = aws_ssm_parameter.master_key.arn
}

output "app_key_arn" {
  description = "ARN of app key"
  value       = aws_ssm_parameter.app_key.arn
}

output "passport_private_key_arn" {
  description = "ARN of passport private key"
  value       = aws_ssm_parameter.passport_private_key.arn
}

output "passport_public_key_arn" {
  description = "ARN of passport public key"
  value       = aws_ssm_parameter.passport_public_key.arn
}

output "redis_address_arn" {
  description = "ARN of the redis address"
  value       = aws_ssm_parameter.redis_address.arn
}

output "git_token_arn" {
  description = "ARN of the git token"
  value       = aws_ssm_parameter.git_token.arn
}
