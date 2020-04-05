Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users , only: [:update,:destroy,:show,:edit]
  resources :groups , only: [:index,:create,:new,:edit,:update]
  resources :posts, only: [:new,:create]
end
