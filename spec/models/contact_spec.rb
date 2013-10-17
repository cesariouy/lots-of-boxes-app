require 'spec_helper'

describe Contact do

  describe "contact#find_pair" do
    before(:each) do
      @other_contact = Contact.create(from: 1, to: 2)
    end

    it "should find an existing matching pair" do
      new_contact = Contact.create(from: 2, to: 1)
      found_pair = new_contact.find_pair
      expect(found_pair).to eq(1)
    end

    it "should return nil if no match exists" do
      new_contact = Contact.create(from: 3, to: 1)
      found_pair = new_contact.find_pair
      expect(found_pair).to be_false
    end
  end

  describe "contact#create_mailbox" do
    before(:each) do
      @contact = Contact.create(from: 1, to: 2)

      @current_user = double("User")
      @current_user.stub(:username).and_return("current_user")
      @current_user.stub(:id).and_return(1)

      @paired_user = double("User")
      @paired_user.stub(:username).and_return("paired_user")
      @paired_user.stub(:id).and_return(2)

      @contact.create_mailbox(@current_user, @paired_user)
    end

    it "should create a new Mailbox" do
      new_mailbox = Mailbox.first
      expect(new_mailbox.title).to eq("correspondence between paired_user and current_user")
    end

    it "should create the first Post for the new Mailbox" do
      post = Mailbox.first.posts.first
      expect(post.body).to eq("contact established")
    end

    it "should create a BoxMembership for each of the two users" do
      expect(BoxMembership.all.count).to eq(2)
    end
  end

end
