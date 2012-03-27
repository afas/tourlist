module ApplicationHelper
  def mark_required(object, field_name)
    validation_types = object.class.validators_on(field_name).map(&:class)
    if validation_types.include? ActiveModel::Validations::PresenceValidator
      content_tag(:span, ' *', :class => 't_red')
    end
  end


  def onlina_table(title, &block)
    render :partial => 'onlina_table/table', :locals => {:title => title, :table => capture(&block)}
  end

  def onlina_row(object, field, title)
    render :partial => 'onlina_table/row', :locals => {:object => object, :field => field, :title => title}
  end
end
