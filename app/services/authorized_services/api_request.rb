module AuthorizedServices
  class ApiRequest
    def initialize(auth_token)
      @auth_token = auth_token
    end

    def call
      { 
        user: current_user 
      }
    end

    private
    attr_reader :auth_token

    def current_user
      @current_user ||= User.find(decoded_auth_token[:user_id]) 
    rescue ActiveRecord::RecordNotFound => e
      raise(
        ExceptionHandler::InvalidToken,
        ("#{I18n.t('authentication.invalid_token')} #{e.message}")
      )
    end

    def decoded_auth_token
      @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
    end

    def http_auth_header
      return auth_token if auth_token.present?
      raise(ExceptionHandler::MissingToken, I18n.t('authentication.missing_token'))
    end
  end
end
