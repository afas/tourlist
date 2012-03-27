# coding: utf-8

class PrivatSpace < Tableless

  FIELDS = [
      [:family, 'Фамилия'],
      [:name, 'Имя'],
      [:patronymic, 'Отчество',],
      [:serial_number, 'Серия и номер загранпаспорта']
  ]

  FIELDS.each { |field, title| v_column field }

  def full_name
    "#{family} #{name} #{patronymic}"
  end

  def empty?
    result = true
    FIELDS.each { |field, title| result = false unless send(field).blank? }
    result
  end

end
