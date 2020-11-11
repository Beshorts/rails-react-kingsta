class Api::PostsController < ApplicationController


  def create
    @post = Post.new(post_params)
    # attach an image to post
    @post.image.attach(params[:image])
    # create image url of active storage attachment
    @image_url = url_for(@post.image)
    # save new post only if image is attached or set error
    if @post.image.attached?
       @post.save
       render json: { status: :created, post: @post, image: @image_url }
    else
      render json: { status: 500, error: ['Upload failed! Please try again'] }

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
      render json: { status: 200, post: @post, user: @user, avatar: @avatar_url, image: @image_url }
    else
      render json: { status: 500, error: ['something went wrong, please try again!'] }
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: { post: @post }
  end

  private

  def post_params
    params.require(:post).permit(:description, :user_id, :image)
  end
end
