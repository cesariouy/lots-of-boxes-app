require 'spec_helper'

describe Mailbox do

  describe "::exists?" do
    before(:each) do
      BoxMembership.stub(:create).and_return("new membership")
      @user1 = double("User")
      @user1.stub(:id).and_return(1)
      @user1.stub(:username).and_return("user1")

      @user2 = double("User")
      @user2.stub(:id).and_return(2)
      @user2.stub(:username).and_return("user2")
    end

    it "should return true if a Mailbox exists given two Users" do
      Mailbox.create(title: "correspondence between user1 and user2")
      result = Mailbox.exists?(@user1, @user2)
      expect(result).to be_true
    end

    it "should return false if no such Mailbox exists" do
      result = Mailbox.exists?(@user1, @user2)
      expect(result).to be_false
    end
  end

end