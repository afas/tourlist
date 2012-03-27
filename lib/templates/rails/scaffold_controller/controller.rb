class <%= controller_class_name %>Controller < ApplicationController
  load_and_authorize_resource

  # GET <%= route_url %>
  # GET <%= route_url %>.xml
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @<%= plural_table_name %> }
    end
  end

  # GET <%= route_url %>/1
  # GET <%= route_url %>/1.xml
  def show
    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @<%= singular_table_name %> }
    end
  end

  # GET <%= route_url %>/new
  # GET <%= route_url %>/new.xml
  def new
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @<%= singular_table_name %> }
    end
  end

  # GET <%= route_url %>/1/edit
  def edit
  end

  # POST <%= route_url %>
  # POST <%= route_url %>.xml
  def create
    respond_to do |format|
      if @<%= singular_table_name %>.save
        format.html { redirect_to(@<%= singular_table_name %>,
                                  :notice => I18n.t('backend.actions.success_create',
                                                    :model => I18n.t('activerecord.capitalized_models.<%= singular_table_name %>'))) }
        format.xml  { render :xml => @<%= singular_table_name %>, :status => :created, :location => @<%= singular_table_name %> }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @<%= singular_table_name %>.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT <%= route_url %>/1
  # PUT <%= route_url %>/1.xml
  def update
    respond_to do |format|
      if @<%= singular_table_name %>.update_attributes(params[:<%= singular_table_name %>])
        format.html { redirect_to(@<%= singular_table_name %>,
                                  :notice => I18n.t('backend.actions.success_update',
                                                    :model => I18n.t('activerecord.capitalized_models.<%= singular_table_name %>'))) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @<%= singular_table_name %>.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE <%= route_url %>/1
  # DELETE <%= route_url %>/1.xml
  def destroy
    @<%= singular_table_name %>.destroy

    respond_to do |format|
      format.html { redirect_to(<%= index_helper %>_url,
                                :notice => I18n.t('backend.actions.success_destroy',
                                                  :model => I18n.t('activerecord.capitalized_models.<%= singular_table_name %>'))) }
      format.xml  { head :ok }
    end
  end
end
