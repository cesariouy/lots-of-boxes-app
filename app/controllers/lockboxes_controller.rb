class LockboxesController < ApplicationController
  before_filter :require_current_user!

  def index
    all_lockboxes = current_user.followed_boxes.where(type: "Lockbox")
    all_lockboxes.reject! { |lockbox| lockbox.posts.empty? }

    @lockboxes = all_lockboxes.sort_by do |lockbox|
      lockbox.posts.last.id
    end

    respond_to do |format|
      format.html { render :index }
      format.json { render json: Box.jsonify(@lockboxes) }
    end
  end

  def show
    @lockbox = Lockbox.find(params[:id])

    respond_to do |format|
      # format.html { render :show }
      format.json { render json: Box.jsonify(@lockbox) }
    end
  end

  def create
    @lockbox = Lockbox.new(params[:lockbox])
    post = Post.new(params[:post])

    if @lockbox.save
      post.box_id = @lockbox.id
      post.save

      @lockbox.create_membership(current_user.id)

      respond_to do |format|
        format.json { render json: Box.jsonify(@lockbox) }
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
