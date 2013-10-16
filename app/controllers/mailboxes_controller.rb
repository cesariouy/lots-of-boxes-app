class MailboxesController < ApplicationController
  before_filter :require_current_user!

  def index
    all_mailboxes = current_user.followed_boxes.where(type: "Mailbox")
    all_mailboxes.reject! { |mailbox| mailbox.posts.empty? }

    @mailboxes = all_mailboxes.sort_by do |mailbox|
      mailbox.posts.last.id
    end

    respond_to do |format|
      format.html { render :index }
      format.json { render json: Box.jsonify(@mailboxes) }
    end
  end

  def show
    @mailbox = Mailbox.find(params[:id])

    respond_to do |format|
      # format.html { render :show }
      format.json { render json: Box.jsonify(@mailbox) }
    end
  end

  def destroy
  end
end
