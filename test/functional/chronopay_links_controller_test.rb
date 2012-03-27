require 'test_helper'

class ChronopayLinksControllerTest < ActionController::TestCase
  setup do
    @chronopay_link = chronopay_links(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:chronopay_links)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create chronopay_link" do
    assert_difference('ChronopayLink.count') do
      post :create, :chronopay_link => @chronopay_link.attributes
    end

    assert_redirected_to chronopay_link_path(assigns(:chronopay_link))
  end

  test "should show chronopay_link" do
    get :show, :id => @chronopay_link.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @chronopay_link.to_param
    assert_response :success
  end

  test "should update chronopay_link" do
    put :update, :id => @chronopay_link.to_param, :chronopay_link => @chronopay_link.attributes
    assert_redirected_to chronopay_link_path(assigns(:chronopay_link))
  end

  test "should destroy chronopay_link" do
    assert_difference('ChronopayLink.count', -1) do
      delete :destroy, :id => @chronopay_link.to_param
    end

    assert_redirected_to chronopay_links_path
  end
end
