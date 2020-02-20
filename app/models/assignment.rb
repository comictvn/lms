class Assignment < ApplicationRecord
  validates_presence_of :name
  
  belongs_to :user
  has_many :questions, dependent: :delete_all
end
