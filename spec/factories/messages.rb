FactoryBot.define do
  
  factory :message do
    content   {"test content"}
    image     {Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixture/sample.jpg'))}
    group
    user
  end
end