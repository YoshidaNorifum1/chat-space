require 'rails_helper'
describe Message do
  describe "#create" do
    it "can be created if message presented" do
      message = build(:message,image: "")
      expect(message).to be_valid
    end
    it "can be created if image presented" do
      message = build(:message,content: "")
      expect(message).to be_valid
    end
    it "can be created if message and presented" do
      message = build(:message)
      expect(message).to be_valid
    end

    it "cant be created if no message" do
      message = build(:message,content:"",image:"")
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
    end
    it "cant be created if no group_id" do
      message = build(:message,group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
    it "cant be created if no user_id" do
      message = build(:message,user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end
  end
end