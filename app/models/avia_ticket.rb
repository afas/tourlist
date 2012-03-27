# coding: utf-8

class AviaTicket < Tableless

  def self.from_to(c, sql_type = nil, begin_default = nil, end_default = nil)
    v_column "#{c}_begin", sql_type, begin_default
    v_column "#{c}_end", sql_type, end_default
  end

  v_column :visit_type, :string, 'go_back'
  from_to :country, :string, 'Россия'
  from_to :city, :string, 'Москва'
  from_to :date, :string, Time.now.strftime("%d.%m.%Y"), (Time.now + 7 * 86400).strftime("%d.%m.%Y")

  validate :check_all

  private

  def check_all
    if visit_type == 'go_back' && Date.parse(date_begin) > Date.parse(date_end)
      errors.add(:date_begin, 'must be less than the end date')
      errors.add(:date_end, 'must be more than the begin date')
    end
  end

end