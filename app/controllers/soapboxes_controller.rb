class SoapboxesController < ApplicationController

  def index
    all_soapboxes = Soapbox.all
    sorted_soapboxes = all_soapboxes.sort_by do |soapbox|
      soapbox.posts.first.id  # beware first/last issue
    end

    @soapboxes = sorted_soapboxes.to_json(include: :posts).html_safe

    respond_to do |format|
      format.html { render :index }
      # format.json { render json: @soapboxes }
    end
  end

  def create
    @soapbox = Soapbox.new(params[:soapbox])

    if @soapbox.save
      respond_to do |format|
        format.json { render json: @soapbox }
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
