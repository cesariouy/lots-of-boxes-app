class Contact < ActiveRecord::Base
  attr_accessible :from, :to_str, :to
  validates :from, :to, presence: true
  validates :from, uniqueness: {scope: :to}

  def to_str=(to_str)
    user = User.find_by_username(to_str)
    self.to = user ? user.id : nil
  end

  def pair_exists?
    pair_contact = Contact.find_by_from_and_to(self.to, self.from)
    !!pair_contact
  end

  def create_mailbox_etc
    current_user = User.find(self.from)
    paired_user = User.find(self.to)
    return nil if Mailbox.exists?(current_user, paired_user)

    mailbox = Mailbox.create(
      title: "correspondence between " + paired_user.username + " and " + current_user.username
    )

    Post.create(
      box_id: mailbox.id,
      user_id: -1,
      body: "contact established",
      signature: "SYSTEM",
      align: "center"
    )

    BoxMembership.create(box_id: mailbox.id, user_id: paired_user.id)
    BoxMembership.create(box_id: mailbox.id, user_id: current_user.id)

    return mailbox
  end
end
