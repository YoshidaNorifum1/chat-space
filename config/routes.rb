Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users , only: [:index,:update,:destroy,:show,:edit]
  resources :groups , only: [:create,:new,:edit,:update] do
    resources :messages, only: [:index,:create,:new]
  end
end
