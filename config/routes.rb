Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :stocks
    resources :user_stocks
  end

  root to: 'spa#index'
  get '*path', to: 'spa#index'
end
