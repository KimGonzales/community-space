Rails.application.routes.draw do
  
  devise_for :users
  scope '/api' do
    resources :discussions do
      resources :comments, only: [:index, :new, :create, :show]
    end
    resources :comments, only: :destroy

    get '/login', to: 'sessions#new'
    post '/login', to: 'sessions#create'
  
    delete '/logout', to: 'sessions#destroy'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
