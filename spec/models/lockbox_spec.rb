require 'spec_helper'

describe Lockbox do

  describe "lockbox#key=" do
    it "should set a lockbox's key_digest given a key" do
      lockbox = Lockbox.new(title: "lockbox")
      key = "password"
      lockbox.key = key

      key_digest_length = lockbox.key_digest.length
      expect(key_digest_length).to eq(60)
    end
  end

  describe "lockbox#is_key?" do
    before(:each) do
      @lockbox = Lockbox.new(title: "lockbox", key: "password")
    end

    it "should recognize its own key" do
      is_key = @lockbox.is_key?("password")
      expect(is_key).to be_true
    end

    it "should not recognize a false key" do
      is_key = @lockbox.is_key?("fake_password")
      expect(is_key).to be_false
    end
  end

  describe "Lockbox::find_by_credentials" do
    before(:each) do
      @lockbox = Lockbox.create(title: "new_lockbox", key: "password")
    end

    it "should find an existing lockbox based on credentials" do
      found_lockbox = Lockbox.find_by_credentials("old_lockbox", "password")
      expect(found_lockbox).to be_false
    end

    it "should return nil if no such lockbox exists" do
      found_lockbox = Lockbox.find_by_credentials("new_lockbox", "password")
      expect(found_lockbox).to eq(@lockbox)
    end
  end

end
