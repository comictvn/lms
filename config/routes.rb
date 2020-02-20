Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      namespace :users do
        resources :me, only: [:index]
      end

      namespace :assignments do
        resources :tests, only: [:create, :show, :index]
      end
      
      resources :authentication, only: [:create, :destroy]
      resources :users
      resources :assignments
    end
  end
end
