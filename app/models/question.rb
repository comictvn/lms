class Question < ApplicationRecord
  validates_presence_of :name, :description

  belongs_to :assignment
  has_many :answers, dependent: :delete_all
end
