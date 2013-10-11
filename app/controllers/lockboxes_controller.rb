class LockboxesController < ApplicationController
  before_filter :require_current_user!

  def index
    all_lockboxes = current_user.followed_boxes.where(type: "Lockbox")
    sorted_lockboxes = all_lockboxes.sort_by do |lockbox|
      lockbox.posts.first.id  # beware first/last issue
    end

    @lockboxes = sorted_lockboxes.to_json(include: :posts).html_safe

    respond_to do |format|
      format.html { render :index }
      # format.json { render json: @lockboxes }
    end
  end

  def create
    @lockbox = Lockbox.new(params[:lockbox])

    if @lockbox.save
      respond_to do |format|
        format.json { render json: @lockbox }
      end
    else
      respond_to do |format|
        format.json { render json: @lockbox.errors.full_messages, status: 422 }
      end
    end
  end

  def destroy
  end
end
