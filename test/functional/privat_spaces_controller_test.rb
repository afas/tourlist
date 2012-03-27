require 'test_helper'

class PrivatSpacesControllerTest < ActionController::TestCase
  setup do
    @privat_space = privat_spaces(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:privat_spaces)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create privat_space" do
    assert_difference('PrivatSpace.count') do
      post :create, :privat_space => @privat_space.attributes
    end

    assert_redirected_to privat_space_path(assigns(:privat_space))
  end

  test "should show privat_space" do
    get :show, :id => @privat_space.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @privat_space.to_param
    assert_response :success
  end

  test "should update privat_space" do
    put :update, :id => @privat_space.to_param, :privat_space => @privat_space.attributes
    assert_redirected_to privat_space_path(assigns(:privat_space))
  end

  test "should destroy privat_space" do
    assert_difference('PrivatSpace.count', -1) do
      delete :destroy, :id => @privat_space.to_param
    end

    assert_redirected_to privat_spaces_path
  end
end
