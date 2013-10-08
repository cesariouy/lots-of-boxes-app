class LockboxesController < ApplicationController
  respond_to :html, :json

  def index
    @lockboxes = Lockbox.all
    respond_with(@lockboxes)
  end

  def create
    @lockbox = Lockbox.new(params[:lockbox])

    if @lockbox.save
      respond_to do |format|
        format.json { render json: @lockbox }
      end
    else
      respond_to do |format|
        format.json { render json: @lockbox.errors, status: 422 }
      end
    end
  end

  def destroy
  end
end
