class SoapboxesController < ApplicationController

  def index
    temp_soapboxes = Soapbox.all
    @soapboxes = temp_soapboxes.sort_by do |soapbox|
      soapbox.posts.last.id
    end

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @soapboxes }
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
        format.json { render json: @soapbox.errors, status: 422 }
      end
    end
  end

  def destroy
  end
end
