# frozen_string_literal: true

class AccountsController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
  end

  def update
    @user = User.find(params[:id])
    @user.update(account_params)
    redirect_to account_path(@user)
  end

  private

  def account_params
    params.require(:account).permit(:email)
  end
end
