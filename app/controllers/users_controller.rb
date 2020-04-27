class UsersController < ApplicationController
  def show
    @user = current_user
  end
  def update
    redirect_to root_path
  end
  def index
    return nil if params[:keyword] == ""
    @users = User.where('name LIKE ?', "%#{params[:keyword]}%").where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

end
