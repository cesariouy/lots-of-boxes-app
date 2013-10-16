class SoapboxesController < ApplicationController

  def index
    all_soapboxes = Soapbox.all
    all_soapboxes.reject! { |soapbox| soapbox.posts.empty? }

    @soapboxes = all_soapboxes.sort_by do |soapbox|
      soapbox.posts.last.id
    end

    respond_to do |format|
      format.html { render :index }
      format.json { render json: Box.jsonify(@soapboxes) }
    end
  end

  def show
    @soapbox = Soapbox.find(params[:id])

    respond_to do |format|
      # format.html { render :show }
      format.json { render json: Box.jsonify(@soapbox) }
    end
  end

  def create
    @soapbox = Soapbox.new(params[:soapbox])
    post = Post.new(params[:post])

    if @soapbox.save
      post.box_id = @soapbox.id
      post.save

      if current_user
        @soapbox.create_membership(current_user.id)
      end

      respond_to do |format|
        format.json { render json: Box.jsonify(@soapbox) }
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
