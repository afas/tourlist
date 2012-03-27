class TopTour < ActiveRecord::Base
  validates :title, :presence => true, :uniqueness => true
  default_scope :order => 'title'

end
