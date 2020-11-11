class Post < ApplicationRecord

  belongs_to :user
  # add image to user as active record file attachment
  has_one_attached :image
  has_many :post_hash_tags

  # a post must have an image associated as attachment
  validates :image, presence: true, allow_blank: true
  # a post must have a description
  validates :description, presence: true
  # relation many-to-many between models Post and HashTag using the third model PostHashTags
  has_many :hash_tags, through: :post_hash_tags

  # create an hashtag when a post is created
  after_commit :create_hash_tags, on: :create

  # this method will be called after a post is created
  # and create hashtags related to post
  # based on the result of get_name_hash_tags method
  def create_hash_tags
    get_name_hash_tags.each do |name|
      hash_tags.create(name: name)
    end
  end

  # method to extract hashtags and return an array of name hashtags
  def get_name_hash_tags
    description.to_s.scan(/#\w+/).map{|name| name.gsub('#', '') }
  end
end
