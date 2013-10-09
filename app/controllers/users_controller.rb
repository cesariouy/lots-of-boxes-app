class UsersController < ApplicationController
  before_filter :require_no_current_user!, only: [:create, :new]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end

  def new
    @user = User.new
    render :new
  end
end
