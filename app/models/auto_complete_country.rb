class AutoCompleteCountry < ActiveRecord::Base
  before_destroy :delete_all_auto_cities

  has_many :auto_complete_cities

  scope :result, order('auto_complete_countries.name')
  scope :do_like, lambda { |q| where('auto_complete_countries.name LIKE ?', q + '%').result }

  private

  def delete_all_auto_cities
    AutoCompleteCity.where('auto_complete_country_id = ?', id).delete_all
  end
end
