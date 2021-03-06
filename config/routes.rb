Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :users
    resource :session, only: [:create, :destroy, :show]
    resources :listings
    resources :reservations
    resources :reviews
  end

end
