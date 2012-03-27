module ChronopayLinksHelper
  def chronopay_link_callback_url(path)
    host_proto = request.url.scan(/^(https?:\/\/[\w\d\.-]+:?\d*)\/.+$/).first.to_s
    host_proto + path
  end

  def chronopay_link_status(chronopay_link)
    color = 'black'
    color = (chronopay_link.status == 1 ? 'green' : 'red') unless chronopay_link.status == 0
    content_tag :div, ChronopayLink::STATUSES[chronopay_link.status], :style => "color: #{color}"
  end
end
