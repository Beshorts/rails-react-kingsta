class User < ApplicationRecord

  # attribute in order that bcrypt gem work
  has_secure_password
  # prevent Users from entering invalid or empty data, and return errors
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :password, length: { minimum: 4 }
  # add avatar to user
  has_one_attached :avatar
  # relation one-to-many
  has_many :posts
end
