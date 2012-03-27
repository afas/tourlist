class PrivatSpacesController < ApplicationController
  before_filter :build_environment_for_full_form, :only => [:index, :pm_success, :pm_failed]

  private
  def build_environment_for_full_form
    @top_countries = Country.where( 'id != ?', -1 ).order('country_order').limit(10)
    @contract = session[:contract] || Contract.new
    if !session[:contract] && session[:avia_buyer]
      @contract.full_name = session[:avia_buyer].full_name
      @contract.email = session[:avia_buyer].email
    end
    @privat_spaces = session[:privat_spaces] || [PrivatSpace.new]
  end

  public
  # GET /privat_spaces
  # GET /privat_spaces.xml
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @privat_spaces }
    end
  end

  def add_tour
    params[:price_id]
    params[:currency_id]

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @privat_spaces }
    end

  end

  def callback
    @pay_info = params
    PrivatSpacesMailer.send_manager_pay_status(@pay_info).deliver
    render :text => "ok"
  end

  def pm_success
    render 'privat_spaces/success'
  end

  def pm_failed
    render 'privat_spaces/decline'
  end

  def search_results
    @top_countries = Country.where( 'id != ?', -1 ).order('country_order').limit(10)
#    params[:currency_id]

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @privat_spaces }
    end
  end

  def new
    @privat_space = PrivatSpace.new
  end

  # POST /privat_spaces
  # POST /privat_spaces.xml
  def create
    @contract = Contract.new(params[:contract])

    @valid = @contract.valid?
    @privat_spaces = []

    privat_json = params[:privat_spaces]
    privat_json.each do |privat_space|
      ps = PrivatSpace.new(privat_space)
      next if ps.empty?
      @valid = false unless ps.valid?
      @privat_spaces << ps
    end
    if @privat_spaces.empty?
      ps = PrivatSpace.new(privat_json.first)
      @valid = false unless ps.valid?
      @privat_spaces << ps
    end
    if @valid
      tour_price = @contract.tour_price
      tour_price = 12345.678 if tour_price == 'NaN'
      @price = tour_price
      @sign = Utils.generate_sign(@price)
      PrivatSpacesMailer.send_manager_privat_spaces(@contract, @privat_spaces).deliver
    end
    session[:contract] = @contract
    session[:privat_spaces] = @privat_spaces
  end

end
