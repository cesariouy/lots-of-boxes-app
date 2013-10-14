class BoxMembershipsController < ApplicationController
  before_filter :require_current_user!

  def create
    @box_membership = BoxMembership.new(params[:box_membership])

    if params[:lockbox]
      lockbox = Lockbox.find_by_credentials(
        params[:lockbox][:title],
        params[:lockbox][:key]
      )

      if lockbox.nil?
        respond_to do |format|
          format.json { render json: { error: "Credentials were wrong" }, status: 422 }
        end
        return
      else
        @box_membership.box_id = lockbox.id
      end
    end

    if @box_membership.save
      respond_to do |format|
        format.json { render json: @box_membership }
      end
    else
      respond_to do |format|
        format.json { render json: @box_membership.errors.full_messages, status: 422 }
      end
    end
  end

  def destroy
    @box_membership = BoxMembership.find(params[:id])
    @box_membership.destroy

    respond_to do |format|
      # format.html
      format.json { render json: "box membership destroyed", status: 200 }
    end
  end
end
