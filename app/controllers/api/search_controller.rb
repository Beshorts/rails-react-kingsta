class Api::SearchController < ApplicationController
  # search posts by hashtag names (search with or without # symbol)
  def index
    params[:query].start_with?('#')
    query = params[:query].gsub('#', '')
    @posts = Post.with_attached_image.order(created_at: :desc).joins(:hash_tags).where(hash_tags: { name: query })
    @attachment = @posts.map { |item| url_for(item.image)}
    @image = @attachment.each { |elem| elem }
    render json: { posts: @posts , images: @image }
  end
end
