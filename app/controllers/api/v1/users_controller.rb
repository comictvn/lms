module Api
  module V1
    class UsersController < BaseController
      def index
        authorize! :manage, User
        page_number = (params[:page] || 1).to_i
        users = User.order(created_at: :desc).page(page_number)
        options = {}
        options[:meta] = { pager: { total: users.total_count, current: page_number } }
        json_users = UserSerializer.new(users, options).serializable_hash
        json_response(json_users)
      end

      def create
        authorize! :manage, User
        user = User.new(user_params)
        user.save!
        response = { message: 'A user account was created!' }
        json_response(response, :created)
      end

      def destroy
        authorize! :manage, User
        user.destroy!
        json_response({message: 'A user account was deleted!'})
      end

      def show
        authorize! :manage, User
        options = {}
        json_user = UserSerializer.new(user, options).serializable_hash
        json_response(json_user)
      end

      def update
        authorize! :manage, User
        user.update!(user_params)
        json_user = UserSerializer.new(user).serializable_hash
        json_response(json_user)
      end

      private
      def user_params
        params.permit(:name, :email, :password, :password_confirmation, :role)
      end

      def user
        @user ||= User.find(params[:id])
      end
    end
  end
end
