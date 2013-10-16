class Contact < ActiveRecord::Base
  attr_accessible :from, :to
  validates :from, :to, presence: true
  # validates :from, uniqueness: {scope: :to}

  def pair
    pair_contact = Contact.find_by_from_and_to(self.to, self.from)
    if pair_contact
      return pair_contact.from
    else
      return nil
    end
  end
end
