module AviaTicketsHelper
  def solo_field(object_sym, field, name, options = {})
    object = instance_variable_get(object_sym.to_s.insert(0, '@').to_sym)
    render :partial => 'avia_tickets/solo_field', :locals => {
        :object => object,
        :object_sym => object_sym,
        :field => field,
        :name => name,
        :options => options
    }
  end

  def from_to_field(form, field, name, options = {})
    options.merge!(:field_data_type => field)
    render :partial => 'avia_tickets/from_to_field', :locals => {
        :f => form,
        :field => field,
        :name => name,
        :options_begin => options.merge(:from_to_type => 'begin'),
        :options_end => options.merge(:from_to_type => 'end')
    }
  end
end