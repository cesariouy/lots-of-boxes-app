class Post < ActiveRecord::Base
  belongs_to :box
  belongs_to :user
  belongs_to :post
  attr_accessible :align, :link, :signature, :body, :box_id, :user_id, :post_id

  validates :align, :signature, :body, :box_id, presence: true

  has_many(
    :replies,
    class_name: "Post",
    foreign_key: :post_id,
    primary_key: :id
  )
end
