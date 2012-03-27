class AutoCompleteController < ApplicationController
  SPLIT_STR = ' | '
  COUNTRY_CITY_SPLIT_STR = ' : '

#  layout false

  def index
    raise CanCan::AccessDenied unless can?(:read, [AutoCompleteCountry, AutoCompleteCity])
    @auto_countries = AutoCompleteCountry.result
  end

  def destroy_country
    if can?(:destroy, AutoCompleteCountry)
      @auto_country = AutoCompleteCountry.find(params[:auto_country_id])
      @auto_country.destroy
    else
      render :text => 'access denied'
    end
  end

  def destroy_city
    if can?(:destroy, AutoCompleteCity)
      @auto_city = AutoCompleteCity.find(params[:auto_city_id])
      @auto_city.destroy
    else
      render :text => 'access denied'
    end
  end

  def countries
    countries = AutoCompleteCountry.do_like(params[:term])
    render :text => countries.map { |country| country.name }.join(SPLIT_STR)
  end

  def cities
    cities = AutoCompleteCity.do_like(params[:country], params[:term])
    result = cities.map { |city| "#{city.auto_complete_country.name}#{COUNTRY_CITY_SPLIT_STR}#{city.name}" }
    render :text => result.join(SPLIT_STR)
  end
end
