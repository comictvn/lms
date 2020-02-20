class User < ApplicationRecord
  has_secure_password
  cattr_accessor :current_user

  enum role: [:teacher, :student]

  validates_presence_of :name, :password_digest, :role
  validates :email, presence: true, email: true, uniqueness: { case_sensitive: true }

  has_many :assignments, dependent: :delete_all
end
