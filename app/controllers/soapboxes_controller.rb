class SoapboxesController < ApplicationController

  def index
    all_soapboxes = Soapbox.all
    all_soapboxes.reject! { |soapbox| soapbox.posts.empty? }

    sorted_soapboxes = all_soapboxes.sort_by do |soapbox|
      soapbox.posts.last.id
    end

    @soapboxes = sorted_soapboxes.to_json(include: [:posts, :box_memberships]).html_safe

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @soapboxes }
    end
  end

  def show
    soapbox = Soapbox.find(params[:id])
    @soapbox = soapbox.to_json(include: [:posts, :box_memberships]).html_safe

    respond_to do |format|
      # format.html { render :show }
      format.json { render json: @soapbox }
    end
  end

  def create
    @soapbox = Soapbox.new(params[:soapbox])
    post = Post.new(params[:post])
    if current_user
      box_membership = BoxMembership.new(user_id: current_user.id)
    end

    if @soapbox.save
      post.box_id = @soapbox.id
      post.save
      if box_membership
        box_membership.box_id = @soapbox.id
        box_membership.save
      end

      respond_to do |format|
        format.json { render json: @soapbox.to_json(include: :posts) }
      end
    else
      respond_to do |format|
        format.json { render json: @soapbox.errors.full_messages, status: 422 }
      end
    end
  end

  def destroy
  end
end
