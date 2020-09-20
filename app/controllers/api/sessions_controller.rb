class Api::SessionsController < ApplicationController

  # session methods to manage User's log in and log out funcionality
  def create
    @user = User.find_by(email: session_params[:email])

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: { logged_in: true, user: @user }
    else
      render json: { status: 401, errors: ['no such user', 'verify credentials and try again or signup'] }
    end
  end

  def is_logged_in?
    if logged_in? && @user
      render json: { logged_in: true, user: @user }
    else
      render json: { logged_in: false, message: 'no such user' }
    end
  end

  def destroy
    logout!
    render json: { status: 200, logged_out: true }
  end

  private

  def session_params
    params.require(:user).permit(:username, :email, :password, :bio, :city)
  end
end
