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

  def self.jsonify(target)
    return target.to_json(include: [:posts, :box_memberships]).html_safe
  end

  def create_membership(user_id)
    BoxMembership.create(
      user_id: user_id,
      box_id: self.id
    )
  end
end
