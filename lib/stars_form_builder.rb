class StarsFormBuilder < ActionView::Helpers::FormBuilder
  include ActionView::Helpers::TagHelper

  def label(method, text = nil, options = {}, &block)
    super + mark_required(object, method) + ':'
  end

  protected

  def mark_required(object, attribute)
    if object.class.validators_on(attribute).map(&:class).include? ActiveModel::Validations::PresenceValidator
      content_tag('span', '*', :style => 'color: red;')
    end
  end
end