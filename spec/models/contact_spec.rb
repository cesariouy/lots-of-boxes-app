require 'spec_helper'

describe Contact do

  describe "#to_str=" do
    it "should return nil if no such user exists" do
      contact = Contact.new
      contact.to_str = "user0"
      expect(contact.to).to be_false
    end

    it "should set a contact's :to attribute given an existing username" do
      user = double("User")
      user.stub(:id).and_return(1)

      User.stub(:find_by_username).and_return(user)

      contact = Contact.new
      contact.to_str = "user1"

      expect(contact.to).to eq(1)
    end
  end

  describe "#pair_exists?" do
    before(:each) do
      @other_contact = double("Contact")
    end

    it "should return true if a matching pair exists" do
      Contact.stub(:find_by_from_and_to).and_return(@other_contact)
      new_contact = Contact.new(from: 2, to: 1)
      expect(new_contact.pair_exists?).to be_true
    end

    it "should return false if no match exists" do
      new_contact = Contact.create(from: 1, to: -1)
      expect(new_contact.pair_exists?).to be_false
    end
  end

  describe "#create_mailbox_etc" do
    before(:each) do
      @contact = Contact.new(from: 1, to: 2)

      current_user = double("User")
      current_user.stub(:username).and_return("current_user")
      current_user.stub(:id).and_return(1)

      paired_user = double("User")
      paired_user.stub(:username).and_return("paired_user")
      paired_user.stub(:id).and_return(2)

      Mailbox.stub(:exists?).and_return(false)
      User.stub(:find).and_return(current_user, paired_user)
    end

    it "should create a new Mailbox" do
      @contact.create_mailbox_etc
      new_mailbox = Mailbox.first
      expect(new_mailbox.title).to eq("correspondence between paired_user and current_user")
    end

    it "should create the first Post for the new Mailbox" do
      @contact.create_mailbox_etc
      post = Mailbox.first.posts.first
      expect(post.body).to eq("contact established")
    end

    it "should create a BoxMembership for each of the two users" do
      @contact.create_mailbox_etc
      expect(BoxMembership.all.count).to eq(2)
    end
  end

end
