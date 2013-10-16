class ContactsController < ApplicationController
  before_filter :require_current_user!

  def create
    @contact = Contact.new(params[:contact])

    user = User.find_by_username(params[:to_str])
    if user.nil?
      respond_to do |format|
        format.json { render json: { error: "no such user" }, status: 422 }
      end
      return
    else
      @contact.to = user.id
    end

    if @contact.save
      #
      pair_id = @contact.pair

      if pair_id
        pair_username = User.find(pair_id).username
        current_username = current_user.username

        mailbox = Mailbox.create(
          title: "correspondence between " + pair_username + " and " + current_username
        )
        Post.create(
          box_id: mailbox.id,
          user_id: -1,
          body: "contact established",
          signature: "SYSTEM",
          align: "center",
        )
        BoxMembership.create(box_id: mailbox.id, user_id: pair_id)
        BoxMembership.create(box_id: mailbox.id, user_id: current_user.id)
      end
      #
      respond_to do |format|
        format.json { render json: @contact }
      end
    else
      respond_to do |format|
        format.json { render json: @contact.errors.full_messages, status: 422 }
      end
    end
  end

  def destroy
  end
end
