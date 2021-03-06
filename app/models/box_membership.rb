class BoxMembership < ActiveRecord::Base
  belongs_to :box
  belongs_to :user
  attr_accessible :box_id, :user_id

  validates :box_id, :user_id, presence: true
  validates :box_id, uniqueness: {scope: :user_id}
end
