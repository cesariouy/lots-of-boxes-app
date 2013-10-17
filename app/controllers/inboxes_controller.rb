class InboxesController < ApplicationController
  before_filter :require_current_user!

  def show
    all_items = current_user.followed_boxes
    all_items.reject! { |box| box.posts.empty? }

    sorted_array = all_items.sort_by do |box|
      box.posts.last.id  # beware first/last issue
    end

    @inbox_items = sorted_array.reverse

    respond_to do |format|
      format.html { render :show }
      # format.json {
      #   render json: @outbox_items.to_json(include: :box).html_safe
      # }
    end
  end
end
