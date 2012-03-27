class StaticPagesController < ApplicationController
  load_and_authorize_resource :except => :show

  # GET /static_pages
  # GET /static_pages.xml
  def index
#    @static_pages = StaticPage.all
    @top_countries = Country.where( 'id != ?', -1 ).order('country_order').limit(10)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @static_pages }
    end
  end

  # GET /static_pages/1
  # GET /static_pages/1.xml
  def show
    @static_page = if params[:id] =~ /^\d+$/
                     StaticPage.find(params[:id])
                   else
                     StaticPage.where('alias = ?', params[:id]).first
                   end
    @top_countries = Country.where('id != ?', -1).order('country_order').limit(10)

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @static_page }
    end
  end

  # GET /static_pages/new
  # GET /static_pages/new.xml
  def new
#    @static_page = StaticPage.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @static_page }
    end
  end

  # GET /static_pages/1/edit
  def edit
#    @static_page = StaticPage.find(params[:id])
  end

  # POST /static_pages
  # POST /static_pages.xml
  def create
#    @static_page = StaticPage.new(params[:static_page])

    respond_to do |format|
      if @static_page.save
        format.html { redirect_to(@static_page, :notice => 'Static page was successfully created.') }
        format.xml  { render :xml => @static_page, :status => :created, :location => @static_page }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @static_page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /static_pages/1
  # PUT /static_pages/1.xml
  def update
#    @static_page = StaticPage.find(params[:id])

    respond_to do |format|
      if @static_page.update_attributes(params[:static_page])
        format.html { redirect_to(@static_page, :notice => 'Static page was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @static_page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /static_pages/1
  # DELETE /static_pages/1.xml
  def destroy
#    @static_page = StaticPage.find(params[:id])
    @static_page.destroy

    respond_to do |format|
      format.html { redirect_to(static_pages_url) }
      format.xml  { head :ok }
    end
  end
end
