class Api::PostsController < ApplicationController


  def create
    @post = Post.create(post_params)
    # attach an image to post
    @post.image.attach(params[:image])
    # create image url of active storage attachment
    @image_url = url_for(@post.image)
    if @post.save
      render json: { status: :created, post: @post, image: @image_url }
    else
      render json: { status: 500, errors: @post.errors.full_messages }

    end
  end

  # get post and his associated user
  def show
    @post = Post.find(params[:id])
    @user = User.find(params[:id] = @post.user.id)
    @avatar = @user.avatar
    # create avatar url of active storage attachment
    @avatar_url = url_for(@user.avatar)
    # create image url of active storage attachment
    @image_url = url_for(@post.image)
    if @post
      render json: { post: @post, user: @user, avatar: @avatar_url, image: @image_url }
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
    params.permit(:description, :user_id, :image)
  end
end
