FactoryBot.define do
  factory :answer do
    description { Faker::Name.name }
  end
end
