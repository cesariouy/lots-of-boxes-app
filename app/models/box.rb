class Box < ActiveRecord::Base
  attr_accessible :key, :title, :type
  attr_reader :key

  validates :title, :type, presence: true

  has_many :posts
  has_many :box_memberships
  has_many(
    :members,
    through: :box_memberships,
    source: :user
  )
end
