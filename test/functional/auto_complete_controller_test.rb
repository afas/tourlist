require 'test_helper'

class AutoCompleteControllerTest < ActionController::TestCase
  test "should get countries" do
    get :countries
    assert_response :success
  end

  test "should get cities" do
    get :cities
    assert_response :success
  end

end
