class Assignment < ApplicationRecord
  validates_presence_of :name, :description
  
  belongs_to :user
  has_many :questions, dependent: :delete_all
end
