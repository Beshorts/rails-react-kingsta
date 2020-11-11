class User < ApplicationRecord
  include Rails.application.routes.url_helpers

  # attribute in order that bcrypt gem work
  has_secure_password
  # add avatar to user as active record file attachment
  has_one_attached :avatar
  # prevent Users from entering invalid or empty data, and return errors
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :password, length: { minimum: 4 }
  validates :avatar, presence: true
  # validate presence of bio and city only on update method
  validates :bio, presence: true, :on => :update
  validates :city, presence: true, :on => :update
  # relation one-to-many
  has_many :posts
end
