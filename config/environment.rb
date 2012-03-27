# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Tourlist::Application.initialize!

require File.expand_path('../../lib/stars_form_builder', __FILE__)