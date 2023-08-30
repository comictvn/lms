locals {
  secrets = [
      {
        "name": "DB_HOST",
        "valueFrom": "${var.database_host_arn}"
      },
      {
        "name": "DB_PASSWORD",
        "valueFrom": "${var.database_password_arn}"
      },
      {
        "name": "MASTER_KEY",
        "valueFrom": "${var.master_key_arn}"
      },
      {
        "name":  "REDIS_HOST",
        "valueFrom": "${var.redis_address_arn}"

      },
      {
        "name": "GIT_TOKEN",
        "valueFrom": "${var.git_token_arn}"
      },
      {
        "name": "APP_KEY",
        "valueFrom": "${var.app_key_arn}"
      },
      {
        "name": "PASSPORT_PRIVATE_KEY",
        "valueFrom": "${var.passport_private_key_arn}"
      },
      {
        "name": "PASSPORT_PUBLIC_KEY",
        "valueFrom": "${var.passport_public_key_arn}"
      }
  ]
  environment  = [
      { "name": "TZ", "value": "Asia/Tokyo" },
      { "name": "APP_ENV", "value": var.env },
      { "name": "APP_DEBUG", "value": "false" },
      { "name": "LOG_CHANNEL", "value": "stderr" },
      { "name": "LOG_LEVEL", "value": "debug" },
      { "name": "LOG_STDERR_FORMATTER", "value": "\\Monolog\\Formatter\\JsonFormatter" },
      { "name": "DB_DATABASE", "value": var.database_name },
      { "name": "DB_USERNAME", "value": var.database_user },
      { "name": "DB_CONNECTION", "value": "pgsql" }
  ]
}
