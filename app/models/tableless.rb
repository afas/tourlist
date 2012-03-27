class Tableless < ActiveRecord::Base
  def self.columns
    @columns ||= [];
  end

  def self.column(name, sql_type = nil, default = nil, null = true)
    columns << ActiveRecord::ConnectionAdapters::Column.new(name.to_s, default,
      sql_type.to_s, null)
  end

  def self.v_column(column_name, sql_type = :string, default = nil, options = {})
    column column_name, sql_type, default, false
    options.merge!({:presence => true})
    validates column_name.to_sym, options
  end

  # Override the save method to prevent exceptions.
  def save(validate = true)
    validate ? valid? : true
  end
end