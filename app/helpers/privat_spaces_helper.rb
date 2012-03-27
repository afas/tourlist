module PrivatSpacesHelper
  def build_callback_url(callback_path)
    url = request.url.scan(/^(https?:\/\/[\w\d\.-]+:?\d*)\/.+$/).first.first.to_s
    url << callback_path
    url << '?'
    brony_params = request.params
    brony_params.delete('controller')
    brony_params.each do |k, v|
      url << "#{k}=#{v}"
      url << '&' unless request.params.to_a.last == [k, v]
    end
    url
  end

  def chronopay_text_hidden(object_name, field_name, options = {})
    options.merge!({:name => "#{object_name}_#{field_name}"})
    hidden_field object_name, field_name, options
  end
end
