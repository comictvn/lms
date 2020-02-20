FactoryBot.define do
  factory :question do
    name { Faker::Name.name }
    description { Faker::Name.name }

    after :create do |question|
      create_list :answer, 3, question: question
    end
  end
end
