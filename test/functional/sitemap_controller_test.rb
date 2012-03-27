require 'test_helper'

class SitemapControllerTest < ActionController::TestCase
  setup do
    @sitemap = sitemaps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sitemaps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sitemap" do
    assert_difference('Sitemap.count') do
      post :create, :sitemap => @sitemap.attributes
    end

    assert_redirected_to sitemap_path(assigns(:sitemap))
  end

  test "should show sitemap" do
    get :show, :id => @sitemap.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @sitemap.to_param
    assert_response :success
  end

  test "should update sitemap" do
    put :update, :id => @sitemap.to_param, :sitemap => @sitemap.attributes
    assert_redirected_to sitemap_path(assigns(:sitemap))
  end

  test "should destroy sitemap" do
    assert_difference('Sitemap.count', -1) do
      delete :destroy, :id => @sitemap.to_param
    end

    assert_redirected_to sitemaps_path
  end
end
