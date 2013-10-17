class Contact < ActiveRecord::Base
  attr_accessible :from, :to
  validates :from, :to, presence: true
  # validates :from, uniqueness: {scope: :to}

  def find_pair
    pair_contact = Contact.find_by_from_and_to(self.to, self.from)
    if pair_contact
      return pair_contact.from
    else
      return nil
    end
  end

  def create_mailbox(current_user, paired_user)
    mailbox = Mailbox.create(
      title: "correspondence between " + paired_user.username + " and " + current_user.username
    )

    Post.create(
      box_id: mailbox.id,
      user_id: -1,
      body: "contact established",
      signature: "SYSTEM",
      align: "center",
    )

    BoxMembership.create(box_id: mailbox.id, user_id: paired_user.id)
    BoxMembership.create(box_id: mailbox.id, user_id: current_user.id)

    return mailbox
  end
end
