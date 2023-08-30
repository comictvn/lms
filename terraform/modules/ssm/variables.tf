variable "name" {
  description = "Name to be used on all the resources as identifier"
}

variable "database_password" {
  description = "Password of the database"
}

variable "database_host" {
  description = "Name of the database host"
}

variable "web_container_name" {
  description = "Name of the docker image"
}

variable "master_key" {
  description = "Name of the master key"
}

variable "app_key" {
  description = "Name of the app key"
}

variable "passport_private_key" {
  description = "Oauth private key"
}

variable "passport_public_key" {
  description = "Oauth public key"
}

variable "docker_username" {
  description = "Docker username"
}

variable "docker_password" {
  description = "Docker password"
}

variable "subnet" {
  description = "Subnet for standalone task"
}

variable "security_group" {
  description = "Security Group"
}

variable "redis_address" {
  description = "Address of the redis server"
}
variable "git_token" {
  description = "Github Token"
}
