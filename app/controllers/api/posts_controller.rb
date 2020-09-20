class Api::PostsController < ApplicationController
  def create
    @post = Post.create(post_params)
    if @post.save
      render json: { status: :created, post: @post }
    else {
      status: 500, errors: ['something went wrong with your post!'] }
    end
  end

  # get post and his associated user
  def show
    @post = Post.find(params[:id])
    @user = User.find(params[:id] = @post.user.id)
    if @post
      render json: { post: @post, user: @user }
    else { status: 500, errors: ['something went wrong!'] }
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: { post: @post }
  end

  private

  def post_params
    params.permit(:image, :description, :user_id)
  end
end
