class TopToursController < ApplicationController
  load_and_authorize_resource

  # GET /top_tours
  # GET /top_tours.xml
  def index
#    @top_tours = TopTour.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @top_tours }
    end
  end

  # GET /top_tours/1
  # GET /top_tours/1.xml
  def show
#    @top_tour = TopTour.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @top_tour }
    end
  end

  # GET /top_tours/new
  # GET /top_tours/new.xml
  def new
#    @top_tour = TopTour.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @top_tour }
    end
  end

  # GET /top_tours/1/edit
  def edit
#    @top_tour = TopTour.find(params[:id])
  end

  # POST /top_tours
  # POST /top_tours.xml
  def create
#    @top_tour = TopTour.new(params[:top_tour])

    respond_to do |format|
      if @top_tour.save
        format.html { redirect_to(@top_tour, :notice => 'Top tour was successfully created.') }
        format.xml  { render :xml => @top_tour, :status => :created, :location => @top_tour }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @top_tour.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /top_tours/1
  # PUT /top_tours/1.xml
  def update
#    @top_tour = TopTour.find(params[:id])

    respond_to do |format|
      if @top_tour.update_attributes(params[:top_tour])
        format.html { redirect_to(@top_tour, :notice => 'Top tour was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @top_tour.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /top_tours/1
  # DELETE /top_tours/1.xml
  def destroy
#    @top_tour = TopTour.find(params[:id])
    @top_tour.destroy

    respond_to do |format|
      format.html { redirect_to(top_tours_url) }
      format.xml  { head :ok }
    end
  end
end
