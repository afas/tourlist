class SitemapController < ApplicationController
  # GET /sitemaps
  # GET /sitemaps.xml
  def index
#    @sitemaps = Sitemap.all
    @static_pages = StaticPage.all
    @top_countries = Country.where( 'id != ?', -1 ).order('country_order').limit(10)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @sitemaps }
    end
  end

  # GET /sitemaps/1
  # GET /sitemaps/1.xml
#  def show
#    @sitemap = Sitemap.find(params[:id])
#
#    respond_to do |format|
#      format.html # show.html.erb
#      format.xml  { render :xml => @sitemap }
#    end
#  end
#
#  # GET /sitemaps/new
#  # GET /sitemaps/new.xml
#  def new
#    @sitemap = Sitemap.new
#
#    respond_to do |format|
#      format.html # new.html.erb
#      format.xml  { render :xml => @sitemap }
#    end
#  end
#
#  # GET /sitemaps/1/edit
#  def edit
#    @sitemap = Sitemap.find(params[:id])
#  end
#
#  # POST /sitemaps
#  # POST /sitemaps.xml
#  def create
#    @sitemap = Sitemap.new(params[:sitemap])
#
#    respond_to do |format|
#      if @sitemap.save
#        format.html { redirect_to(@sitemap, :notice => 'Sitemap was successfully created.') }
#        format.xml  { render :xml => @sitemap, :status => :created, :location => @sitemap }
#      else
#        format.html { render :action => "new" }
#        format.xml  { render :xml => @sitemap.errors, :status => :unprocessable_entity }
#      end
#    end
#  end
#
#  # PUT /sitemaps/1
#  # PUT /sitemaps/1.xml
#  def update
#    @sitemap = Sitemap.find(params[:id])
#
#    respond_to do |format|
#      if @sitemap.update_attributes(params[:sitemap])
#        format.html { redirect_to(@sitemap, :notice => 'Sitemap was successfully updated.') }
#        format.xml  { head :ok }
#      else
#        format.html { render :action => "edit" }
#        format.xml  { render :xml => @sitemap.errors, :status => :unprocessable_entity }
#      end
#    end
#  end
#
#  # DELETE /sitemaps/1
#  # DELETE /sitemaps/1.xml
#  def destroy
#    @sitemap = Sitemap.find(params[:id])
#    @sitemap.destroy
#
#    respond_to do |format|
#      format.html { redirect_to(sitemaps_url) }
#      format.xml  { head :ok }
#    end
#  end
end
