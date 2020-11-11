class Api::UsersController < ApplicationController

  def index
    @users = User.all
    if @users
      render json: { users: @users }
    else
      render json: { status: 500, errors: ['no users found'] }
    end
  end

  def show
    @user = User.find(params[:id])
    # find all posts with an image attached
    @posts = @user.posts.with_attached_image.order(created_at: :desc)
    # create images url of active storage attachments
    @attachment = @posts.map { |item| url_for(item.image)}
    @image = @attachment.each { |elem| elem }
    @avatar = @user.avatar
    # create avatar url of active storage attachment
    @avatar_url = url_for(@user.avatar)

    if @user
      render json: { status: 200, user: @user, posts: @posts, images: @image, avatar: @avatar_url }
    else
      render json: { status: 500, error: ['something went wrong!'] }
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: { status: :created, user: @user }
    else
      render json: { status: 500, errors: @user.errors.full_messages }
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.avatar.attach(params[:avatar])
    @avatar_url = url_for(@user.avatar)
    # update user info only if an image is attached, if not throw error
    if @user.avatar.attached?
      @user.update_columns(bio: params[:bio], city: params[:city])
      render json: { status: :updated, user: @user, avatar: @avatar_url }
    else
      render json: { status: 500, error: ['Upload failed! Please try again'] }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :bio, :city, :avatar)
  end
end
