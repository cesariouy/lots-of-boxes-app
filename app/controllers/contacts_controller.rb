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
      pair_id = @contact.find_pair

      if pair_id
        paired_user = User.find(pair_id)
        @contact.create_mailbox(current_user, paired_user)
      end

      respond_to do |format|
        format.json { render json: @contact.to_json }
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
