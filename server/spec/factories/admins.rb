FactoryBot.define do
  factory :admin do
    email { Faker::Internet.unique.email }
    password { "password" }
  end
end
