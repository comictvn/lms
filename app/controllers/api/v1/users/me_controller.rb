module Api
  module V1
    class Users::MeController < BaseController
      def index
        json_user = Api::V1::Users::MeSerializer.new(current_user).serializable_hash
        json_response(json_user)
      end
    end
  end
end
