class OutboxesController < ApplicationController
  before_filter :require_current_user!

  def show
    all_items = current_user.posts
    sorted_items = all_items.sort_by do |post|
      post.id
    end

    @outbox_items = all_items.reverse

    respond_to do |format|
      format.html { render :show }
      # format.json {
      #   render json: @outbox_items.to_json(include: :box).html_safe
      # }
    end
  end
end
