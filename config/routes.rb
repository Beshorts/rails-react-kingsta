Rails.application.routes.draw do

  namespace :api, defaults: { format: 'json' } do
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/logged_in', to: 'sessions#is_logged_in?'
    get '/search', to: 'search#index'
    resources :users, only: [:create, :show, :index, :edit, :update]
    resources :posts, only: [:create, :show, :destroy]
    post '/rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  end
end
