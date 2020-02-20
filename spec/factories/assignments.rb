FactoryBot.define do
  factory :assignment do
    name { Faker::Name.name }
    description { Faker::Name.name }

    after :create do |assignment|
      create_list :question, 3, assignment: assignment
    end
  end
end
