Rails.application.routes.draw do
  devise_for :users
  root "messages#index"
  resources :users , only: [:update,:destroy,:show,:edit]
end
