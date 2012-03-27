# coding: utf-8

class AviaTicketMailer < ActionMailer::Base
  default :from => Tourlist::Application.from_email

  def send_manager_avia_ticket(buyer, ticket)
    @buyer = buyer
    @ticket = ticket

    mail(:to => Tourlist::Application.to_email,
         :subject => "Заказ авиа билета от #{@buyer.full_name}")
  end

end
