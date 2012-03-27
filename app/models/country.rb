class Country < ActiveRecord::Base
  validates :name, :presence => true, :uniqueness => true
#  default_scope :order => 'country_order'

  has_attached_file :image,
                    :styles => {
                        :large => "200x200#",
                        :small => "59x59#"
                    },
                    :url => "/images/countries/:id/:style.:extension"
  
end
