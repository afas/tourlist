require 'test_helper'

class TopToursControllerTest < ActionController::TestCase
  setup do
    @top_tour = top_tours(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:top_tours)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create top_tour" do
    assert_difference('TopTour.count') do
      post :create, :top_tour => @top_tour.attributes
    end

    assert_redirected_to top_tour_path(assigns(:top_tour))
  end

  test "should show top_tour" do
    get :show, :id => @top_tour.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @top_tour.to_param
    assert_response :success
  end

  test "should update top_tour" do
    put :update, :id => @top_tour.to_param, :top_tour => @top_tour.attributes
    assert_redirected_to top_tour_path(assigns(:top_tour))
  end

  test "should destroy top_tour" do
    assert_difference('TopTour.count', -1) do
      delete :destroy, :id => @top_tour.to_param
    end

    assert_redirected_to top_tours_path
  end
end
