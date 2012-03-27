class HotelsController < ApplicationController
  # GET /countries/1
  # GET /countries/1.xml
  def show
    respond_to do |format|
      format.html # show.html.erb
    end
  end

end
