class Mailbox < Box
  validates :title, uniqueness: true

  def self.exists?(user1, user2)
    mailbox = Mailbox.find_by_title(
      "correspondence between " + user1.username + " and " + user2.username
    )

    if mailbox
      BoxMembership.create(box_id: mailbox.id, user_id: user1.id)
      BoxMembership.create(box_id: mailbox.id, user_id: user2.id)
      return true
    else
      return false
    end
  end
end