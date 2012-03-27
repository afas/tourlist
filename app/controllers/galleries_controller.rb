class GalleriesController < ApplicationController
  # GET /galleries
  # GET /galleries.xml
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @galleries }
    end
  end
end
