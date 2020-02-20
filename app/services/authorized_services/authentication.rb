module AuthorizedServices
  class Authentication
    attr_reader :token, :id

    def initialize(email, password)
      @email = email
      @password = password
    end

    def call
      @token = JsonWebToken.encode(payload) if current_user.present?
      self
    end

    private
    attr_reader :email, :password

    def payload
      {
        user_id: current_user.id,
        email: current_user.email,
        role: current_user.role,
      }
    end

    def token_id
      @token_id ||= Time.now.to_i
    end

    def current_user
      @current_user ||= begin
        user = User.find_by(email: email)
        if user && user.authenticate(password)
          user.reload
        else
          raise(ExceptionHandler::AuthenticationError, I18n.t('authentication.invalid_credentials'))
        end
      end
    end
  end
end
