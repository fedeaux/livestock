Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :stock_earnings, except: %i[new edit]
    resources :stock_kpis, except: %i[new edit]
    resources :stock_prices, except: %i[new edit]
    resources :stocks, except: %i[new edit]
    resources :user_stock_earnings, except: %i[new edit]
    resources :user_stock_operations, except: %i[new edit]
    resources :user_stocks, except: %i[new edit]
    resources :wallets, except: %i[new edit]
  end

  namespace :integrations do
    namespace :clear do
      get :injector
      post :prices
    end

    namespace :status_invest do
      get :injector
      post :operations
      post :stocks
    end
  end

  root to: 'spa#index'
  get '*path', to: 'spa#index'
end
