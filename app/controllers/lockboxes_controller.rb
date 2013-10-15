class LockboxesController < ApplicationController
  before_filter :require_current_user!

  def index
    all_lockboxes = current_user.followed_boxes.where(type: "Lockbox")
    all_lockboxes.reject! { |lockbox| lockbox.posts.empty? }

    sorted_lockboxes = all_lockboxes.sort_by do |lockbox|
      lockbox.posts.last.id
    end

    @lockboxes = sorted_lockboxes.to_json(include: [:posts, :box_memberships]).html_safe

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @lockboxes }
    end
  end

  def show
    lockbox = Lockbox.find(params[:id])
    @lockbox = lockbox.to_json(include: [:posts, :box_memberships]).html_safe

    respond_to do |format|
      # format.html { render :show }
      format.json { render json: @lockbox }
    end
  end

  def create
    @lockbox = Lockbox.new(params[:lockbox])
    post = Post.new(params[:post])
    box_membership = BoxMembership.new(user_id: current_user.id)

    if @lockbox.save
      post.box_id = @lockbox.id
      post.save
      box_membership.box_id = @lockbox.id
      box_membership.save

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
