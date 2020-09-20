class HashTag < ApplicationRecord
  # relation many-to-many between Hashtag Post and PostHashtags
  has_many :post_hash_tags
  # relation many-to-many between models Post and HashTag using the third model PostHashTags
  has_many :posts, through: :post_hash_tags
end
