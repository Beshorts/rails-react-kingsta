class ApplicationController < ActionController::API
  # add module to run helper_method
  include AbstractController::Helpers
  # prevents Rails from using its authenticity token
  #skip_before_action :verify_authenticity_token

  # methods defined below will be passed to all other controllers
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!

  # methods to authorize a user based on the session data
  def login!
    session[:user_id] = @user.id
  end

  def logged_in?
    !session[:user_id]
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorized_user?
    @user == current_user
  end

  def logout!
    session.clear
  end
end
