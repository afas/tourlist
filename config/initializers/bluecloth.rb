require 'bluecloth'

class String
 def markdown
   BlueCloth.new(self).to_html
 end
end