FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { "teacher@iwa.com" }
    password { "12345678" }
    role { "teacher" }
  end
end
