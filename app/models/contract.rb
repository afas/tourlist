class Contract < Tableless
  v_column :i_agree
  validate :check_agree

  include UserFields

  column :tour_number
  column :tour_price
  column :phone_country, :string, '+7'
  column :phone_city
  column :phone_number
  column :description

  def check_agree
    errors.add(:i_agree, 'wrong value') unless self.i_agree.to_i == 1
  end

end