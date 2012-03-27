class AviaTicketsController < ApplicationController

  layout false

  # GET /avia_tickets/new
  # GET /avia_tickets/new.xml
  def new
    @avia_buyer = session[:avia_buyer] || AviaBuyer.new
    if !session[:avia_buyer] && session[:contract]
      @avia_buyer.full_name = session[:contract].full_name
      @avia_buyer.email = session[:contract].email
    end
    @avia_ticket = session[:avia_ticket] || AviaTicket.new
  end

  # POST /avia_tickets
  # POST /avia_tickets.xml
  def create
    save_auto_completes

    @avia_buyer = AviaBuyer.new(params[:avia_buyer])
    session[:avia_buyer] = @avia_buyer
    @avia_ticket = AviaTicket.new(params[:avia_ticket])
    session[:avia_ticket] = @avia_ticket

    all_valid = @avia_buyer.valid?
    all_valid = false unless @avia_ticket.valid?

    if all_valid
      AviaTicketMailer.send_manager_avia_ticket(@avia_buyer, @avia_ticket).deliver

      session[:avia_ticket] = nil
      @avia_ticket = AviaTicket.new

      render :action => :create
    else
      render :action => :new
    end
  end

  private

  def save_auto_completes
    save_ac_type(:country)
    save_ac_type(:city)
  end

  def save_ac_type(ac_type)
    save_ac_location(ac_type, :begin)
    save_ac_location(ac_type, :end)
  end

  def save_ac_location(ac_type, locate_type)
    ac_class = "AutoComplete#{ac_type.to_s.capitalize}".constantize
    ac_value = params[:avia_ticket]["#{ac_type}_#{locate_type}"]
    return if ac_value.blank?
    if ac_type == :city
      ac_country = AutoCompleteCountry.find_by_name(params[:avia_ticket]["country_#{locate_type}"])
      return unless ac_country
      ac_class.find_or_create_by_auto_complete_country_id_and_name(ac_country.id, ac_value)
    else
      ac_class.find_or_create_by_name(ac_value)
    end
  end

end
