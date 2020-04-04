Rails.application.routes.draw do
  devise_for :users
  root "messages#index"
  resources :users , only: [:update,:destroy,:show,:edit]
  resources :groups , only: [:create,:new]
end
