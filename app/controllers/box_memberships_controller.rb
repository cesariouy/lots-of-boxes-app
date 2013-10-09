class BoxMembershipsController < ApplicationController
  before_filter :require_current_user!

  def create
    @box_membership = BoxMembership.new(params[:box_membership])

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
  end
end
