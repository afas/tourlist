class ChronopayLinksController < ApplicationController
  load_and_authorize_resource :except => [:callback, :success, :failed]

  def callback
    PrivatSpacesMailer.send_manager_pay_status(params).deliver
    render :text => "ok"
  end

  def success
    @chronopay_link = ChronopayLink.find(params[:id])
    @chronopay_link.status = 1
    @chronopay_link.save
  end

  def failed
    @chronopay_link = ChronopayLink.find(params[:id])
    @chronopay_link.status = -1
    @chronopay_link.save
  end

  # GET /chronopay_links
  # GET /chronopay_links.xml
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @chronopay_links }
    end
  end

  # GET /chronopay_links/1
  # GET /chronopay_links/1.xml
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @chronopay_link }
    end
  end

  # GET /chronopay_links/new
  # GET /chronopay_links/new.xml
  def new
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @chronopay_link }
    end
  end

  # GET /chronopay_links/1/edit
  def edit
  end

  # POST /chronopay_links
  # POST /chronopay_links.xml
  def create
    respond_to do |format|
      if @chronopay_link.save
        format.html { redirect_to(@chronopay_link,
                                  :notice => I18n.t('backend.actions.success_create',
                                                    :model => I18n.t('activerecord.capitalized_models.chronopay_link'))) }
        format.xml  { render :xml => @chronopay_link, :status => :created, :location => @chronopay_link }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @chronopay_link.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /chronopay_links/1
  # PUT /chronopay_links/1.xml
  def update
    respond_to do |format|
      if @chronopay_link.update_attributes(params[:chronopay_link])
        format.html { redirect_to(@chronopay_link,
                                  :notice => I18n.t('backend.actions.success_update',
                                                    :model => I18n.t('activerecord.capitalized_models.chronopay_link'))) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @chronopay_link.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /chronopay_links/1
  # DELETE /chronopay_links/1.xml
  def destroy
    @chronopay_link.destroy

    respond_to do |format|
      format.html { redirect_to(chronopay_links_url,
                                :notice => I18n.t('backend.actions.success_destroy',
                                                  :model => I18n.t('activerecord.capitalized_models.chronopay_link'))) }
      format.xml  { head :ok }
    end
  end
end
