class <%= class_name %>Controller < ApplicationController
<% for action in actions -%>
  def <%= action %>
    raise CanCan::AccessDenied unless can?(<%= action %>, <%= class_name %>)

  end

<% end -%>
end
