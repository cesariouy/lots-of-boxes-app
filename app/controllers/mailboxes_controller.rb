class MailboxesController < ApplicationController
  respond_to :html, :json

  def index
    @mailboxes = Mailbox.all
    respond_with(@mailboxes)
  end

  def create
    @mailbox = Mailbox.new(params[:mailbox])

    if @mailbox.save
      respond_to do |format|
        format.json { render json: @mailbox }
      end
    else
      respond_to do |format|
        format.json { render json: @mailbox.errors, status: 422 }
      end
    end
  end

  def destroy
  end
end
