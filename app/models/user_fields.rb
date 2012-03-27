module UserFields
  def self.included(base)
    base.v_column :full_name
    base.v_column :email, :string, '', :format => { :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i }
  end
end