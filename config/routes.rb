Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :stocks, except: %i[new edit]
    resources :user_stocks, except: %i[new edit]
    resources :user_stock_dividends, except: %i[new edit]
  end

  root to: 'spa#index'
  get '*path', to: 'spa#index'
end
