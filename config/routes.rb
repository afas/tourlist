Tourlist::Application.routes.draw do

  resources :chronopay_links do
    get 'callback', :on => :collection
    member do
      get 'success'
      get 'failed'
    end
  end

  match "/auto_complete" => 'auto_complete#index', :as => :auto_complete
  match "/auto_countries" => 'auto_complete#countries', :as => :auto_country
  match "/auto_cities" => 'auto_complete#cities', :as => :auto_city
  match "/delete_auto_country/:auto_country_id" => 'auto_complete#destroy_country', :as => :delete_auto_country
  match "/delete_auto_city/:auto_city_id" => 'auto_complete#destroy_city', :as => :delete_auto_city

  resources :avia_tickets, :only => [:new, :create]

#  resources :galleries, :only => :index

  resources :sitemap
  #resources :any_avia
  devise_for :users

  resources :static_pages
#  match '/static_pages/:alias' => 'static_pages#show', :as => :static_show

  resources :privat_spaces, :except => [:edit, :update, :destroy]

  match '/hotels' => 'hotels#show', :as => :hotels_show

  match '/private_space/:price_id/:currency_id' => 'privat_spaces#add_tour', :as => :add_tour
  match '/payments/callback' => 'privat_spaces#callback', :as => :pm_callback
  match '/payments/success' => 'privat_spaces#pm_success', :as => :pm_success
  match '/payments/failed' => 'privat_spaces#pm_failed', :as => :pm_failed
  match '/search_results' => 'privat_spaces#search_results', :as => :search_results

  resources :top_tours
  resources :countries

  root :to => 'welcome#index'
end
