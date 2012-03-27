class AutoCompleteCity < ActiveRecord::Base
  belongs_to :auto_complete_country

  scope :result, order('auto_complete_cities.name')
  scope :do_like, lambda { |country_begin, city_begin|
    joins(:auto_complete_country).
        where('auto_complete_countries.name LIKE ?', country_begin + '%').
        where('auto_complete_cities.name LIKE ?', city_begin + '%').
        group('auto_complete_cities.name').
        result
  }
end
