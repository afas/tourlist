class Utils
  def self.generate_sign(price)
    Digest::MD5.hexdigest("#{Tourlist::Application.product_id}-#{price}-#{Tourlist::Application.signature}")
  end
end