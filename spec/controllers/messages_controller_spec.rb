require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    context "log in"do
      before do
        login user
        get :index, params: {group_id: group.id}
      end

      it "in @message collect value" do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it "in @group collect value" do
        expect(assigns(:group)).to eq group
      end
      it "go to index.html.haml" do
        expect(response).to render_template :index
      end
    end

    context "log out" do
      it "go to users/sign_in" do
        get :index, params: {group_id: group.id}
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { {group_id: group.id, user_id: user.id,message: attributes_for(:message) } }

    context "log in and success to store the message" do
      before do
        login user
      end
      subject { post :create, params: params}

      it "can store the message" do
        expect{subject }.to change(Message, :count).by(1)
      end
      it "go to group_messages_path" do
        subject
        expect(response).to redirect_to(group_messages_path)
      end
    end

    context "log in and not success to store the message" do
      before do
        login user
      end
      let(:invalid_params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
      subject { post :create, params: invalid_params}

      it "no store the message" do
        expect{ subject }.not_to change(Message, :count)
      end
      it " go to index.html.haml" do
        subject
        expect(response).to render_template :index
      end

    end
    context "log out" do
      it "redirect to new_user_session_path" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end

    end
  end
end