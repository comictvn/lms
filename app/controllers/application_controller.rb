class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler

  before_action :authorize_request
  before_action :log_current_user

  attr_reader :current_user

  private
  def authorize_request
    @current_user = (AuthorizedServices::ApiRequest.new(cookies[:jwt]).call)[:user]
  end

  def log_current_user
    User.current_user = current_user if current_user
  end
end
