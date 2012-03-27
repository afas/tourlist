# coding: utf-8

class ChronopayLink < ActiveRecord::Base
  STATUSES = {
      -1 => 'Ошибка',
      0 => 'Не оплачено',
      1 => 'Оплачено'
  }

  default_scope order('updated_at DESC')

  before_save :generate_sign

  validates :name, :presence => true
  validates :pay_product_id, :presence => true
  validates :product_price, :presence => true

  private
  def generate_sign
    self.sign = Utils.generate_sign(product_price) if product_price
  end
end
