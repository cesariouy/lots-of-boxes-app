class ContactsController < ApplicationController
  before_filter :require_current_user!

  def create
    @contact = Contact.new(params[:contact])

    if @contact.pair_exists?
      @contact.create_mailbox_etc
    else
      respond_to do |format|
        format.json { render json: { error: "no such user" }, status: 422 }
      end
      return
    end

    if @contact.save
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
