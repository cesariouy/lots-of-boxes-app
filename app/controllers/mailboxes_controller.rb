class MailboxesController < ApplicationController
  before_filter :require_current_user!

  def index
    all_mailboxes = current_user.followed_boxes.where(type: "Mailbox")
    all_mailboxes.reject! { |mailbox| mailbox.posts.empty? }

    sorted_mailboxes = all_mailboxes.sort_by do |mailbox|
      mailbox.posts.last.id
    end

    @mailboxes = sorted_mailboxes.to_json(include: [:posts, :box_memberships]).html_safe

    respond_to do |format|
      format.html { render :index }
      format.json { render json: @mailboxes }
    end
  end

  def show
    mailbox = Mailbox.find(params[:id])
    @mailbox = mailbox.to_json(include: [:posts, :box_memberships]).html_safe

    respond_to do |format|
      # format.html { render :show }
      format.json { render json: @mailbox }
    end
  end

  def create  # is this even necessary?
    @mailbox = Mailbox.new(params[:mailbox])
    post = Post.new(params[:post])
    box_membership = BoxMembership.new(user_id: current_user.id)

    if @mailbox.save
      post.box_id = @mailbox.id
      post.save
      box_membership.box_id = @mailbox.id
      box_membership.save

      respond_to do |format|
        format.json { render json: @mailbox.to_json(include: :posts) }
      end
    else
      respond_to do |format|
        format.json { render json: @mailbox.errors.full_messages, status: 422 }
      end
    end
  end

  def destroy
  end
end
