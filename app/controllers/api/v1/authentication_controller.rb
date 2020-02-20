module Api
  module V1
    class AuthenticationController < BaseController
      skip_before_action :authorize_request, only: :create

      def create
        authorized = AuthorizedServices::Authentication.new(auth_params[:email], auth_params[:password]).call
        set_cookie_jwt(authorized.token)
        json_response({})
      end

      def destroy
        cookies.delete :jwt
        json_response({})
      end

      private
      def auth_params
        params.permit(:email, :password)
      end

      def set_cookie_jwt(token)
        cookies[:jwt] = {
          value: token,
          httponly: true
        }
      end
    end
  end
end
