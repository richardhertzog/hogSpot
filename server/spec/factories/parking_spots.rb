FactoryBot.define do
  factory :parking_spot do
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
    description { Faker::Lorem.sentence }
    paid { false }
    status { :pending }

    trait :approved do
      status { :approved }
    end

    trait :paid do
      paid { true }
      hours { "9am-6pm Mon-Sat" }
    end
  end
end
