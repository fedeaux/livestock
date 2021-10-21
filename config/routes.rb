Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :wallets, except: %i[new edit]
    resources :stocks, except: %i[new edit]
    resources :stock_earnings, except: %i[new edit]
    resources :stock_kpis, except: %i[new edit]
    resources :user_stocks, except: %i[new edit]
    resources :user_stock_earnings, except: %i[new edit]
  end

  get :clear_thief_chrome_extension, to: "spa#clear_thief_chrome_extension"
  post :nem_a_pau_ne, to: "spa#hahaha_nao_creio"

  root to: 'spa#index'
  get '*path', to: 'spa#index'
end
