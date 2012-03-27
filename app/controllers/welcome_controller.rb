class WelcomeController < ApplicationController
  def index
    @countries = Country.where( 'id != ?', -1 ).order('rand()').limit(6)
    @top_countries = Country.where( 'id != ?', -1 ).order('country_order').limit(10)
  end
end
