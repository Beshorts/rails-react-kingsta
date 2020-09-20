class Api::SearchController < ApplicationController
  # search posts by hashtag names (search with or without # symbol)
  def index
    params[:query].start_with?('#')
    query = params[:query].gsub('#', '')
    @posts = Post.order(created_at: :desc).joins(:hash_tags).where(hash_tags: { name: query })
    render json: { posts: @posts }
  end
end
