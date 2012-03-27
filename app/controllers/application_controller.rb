class ApplicationController < ActionController::Base
  protect_from_forgery

  #rescue_from ActiveRecord::RecordNotFound do |exception|
  #  redirect_to root_url
  #end
  #
  #rescue_from CanCan::AccessDenied do |exception|
  #  redirect_to root_url
  #end

#  before_filter :clear_session
#  private
#  def clear_session
#    session.clear
#  end

end
