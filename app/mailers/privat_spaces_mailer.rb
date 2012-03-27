# coding: utf-8

class PrivatSpacesMailer < ActionMailer::Base
  default :from => Tourlist::Application.from_email

  def send_manager_privat_spaces(contract, privat_spaces)
    @contract = contract
    @privat_spaces = privat_spaces

    mail(:to => Tourlist::Application.to_email,
         :subject => "Паспортные данные для тура №#{@contract.tour_number}")
  end

  def send_manager_pay_status(pay_info)
    @pay_info = pay_info
    mail(:to => Tourlist::Application.to_email,
         :subject => "Оповещение о прохождении платежа по туру #{@pay_info[:cs1]}")
  end
end
