FactoryBot.define do
  
  factory :user do
    name              {Faker::Name.last_name}
    password          {"00000000"}
    sequence(:email)  { Faker::Internet.email}
  end
end