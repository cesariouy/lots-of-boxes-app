require 'spec_helper'

describe Box do

  describe "::jsonify" do
    before(:each) do
      @box1 = Box.new(title: "First Box")
      @box2 = Box.new(title: "Second Box")

      @post1 = double("Post")
      @post1.stub(:serializable_hash).and_return({
        box_id: 5,
        user_id: 1,
        body: "post to first box"
      })
      @post2 = double("Post")
      @post2.stub(:serializable_hash).and_return({
        box_id: 6,
        user_id: 2,
        body: "post to second box"
      })

      @membership1 = double("BoxMembership")
      @membership1.stub(:serializable_hash).and_return({
        box_id: 5,
        user_id: 1
      })
      @membership2 = double("BoxMembership")
      @membership2.stub(:serializable_hash).and_return({
        box_id: 6,
        user_id: 2
      })
    end

    it "handles a single box object with no associations" do
      box = Box.new(title: "New Box")

      expect(Box.jsonify(box)).to eq(
        '{"created_at":null,"id":null,"key_digest":null,"title":"New Box","updated_at":null,"posts":[],"box_memberships":[]}'
      )
    end

    it "handles a box object with posts and memberships" do
      post2 = double("Post")
      post2.stub(:serializable_hash).and_return({
        box_id: 5,
        user_id: 2,
        body: "<p>these tags should be escaped</p>"
      })

      membership2 = double("BoxMembership")
      membership2.stub(:serializable_hash).and_return({
        box_id: 5,
        user_id: 2
      })

      @box1.stub(:posts).and_return([@post1, post2])
      @box1.stub(:box_memberships).and_return([@membership1, membership2])

      open_str = '{"created_at":null,"id":null,"key_digest":null,"title":"First Box","updated_at":null,'
      posts_str = '"posts":[{"box_id":5,"user_id":1,"body":"post to first box"},{"box_id":5,"user_id":2,"body":"<p>these tags should be escaped</p>"}],'
      memberships_str = '"box_memberships":[{"box_id":5,"user_id":1},{"box_id":5,"user_id":2}]}'

      expect(Box.jsonify(@box1)).to eq(
        open_str + posts_str + memberships_str
      )
    end

    it "handles several box objects with associations" do

      @box1.stub(:posts).and_return([@post1])
      @box1.stub(:box_memberships).and_return([@membership1])

      @box2.stub(:posts).and_return([@post2])
      @box2.stub(:box_memberships).and_return([@membership2])

      boxes = [@box1, @box2]

      box1_open = '[{"created_at":null,"id":null,"key_digest":null,"title":"First Box","updated_at":null,'
      box1_posts = '"posts":[{"box_id":5,"user_id":1,"body":"post to first box"}],'
      box1_memberships = '"box_memberships":[{"box_id":5,"user_id":1}]},'
      box2_open = '{"created_at":null,"id":null,"key_digest":null,"title":"Second Box","updated_at":null,'
      box2_posts = '"posts":[{"box_id":6,"user_id":2,"body":"post to second box"}],'
      box2_memberships = '"box_memberships":[{"box_id":6,"user_id":2}]}]'

      expect(Box.jsonify(boxes)).to eq(
        box1_open + box1_posts + box1_memberships + box2_open + box2_posts + box2_memberships
      )
    end
  end

  describe "box#create_membership" do
    it "should create a BoxMembership given a user's :id" do
      box = Box.create(title: "New Box")

      user = double("User")
      user.stub(:id).and_return(10)

      new_membership = box.create_membership(user.id)
      stringified_class = new_membership.class.to_s

      expect(stringified_class).to eq("BoxMembership")
    end
  end

end
