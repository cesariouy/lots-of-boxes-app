# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Soapbox.create(title: "first soapBox")

Post.create(
  box_id: 1,
  user_id: 1,
  body: "this is the first post to the first box",
  signature: "anonymous",
  align: "center"
)