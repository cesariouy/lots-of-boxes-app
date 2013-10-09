class Lockbox < Box
  validates :key_digest, presence: { message: "Key can't be blank" }
  validates :key, length: { minimum: 6, allow_nil: true }
  validates :title, uniqueness: true

  def self.find_by_credentials(title, key)
    lockbox = Lockbox.find_by_title(title)
    return nil if lockbox.nil?
    lockbox.is_key?(key) ? lockbox : nil
  end

  def is_key?(key)
    BCrypt::Password.new(self.key_digest).is_password?(key)
  end

  def key=(key)
    @key = key
    self.key_digest = BCrypt::Password.create(key)
  end
end