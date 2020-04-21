class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    p = message_params
    @message = @group.messages.new(p)
    if @message.save then
      respond_to do |format|
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "please enter message"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content,:image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
