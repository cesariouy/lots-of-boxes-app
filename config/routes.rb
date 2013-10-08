LotsOfBoxesApp::Application.routes.draw do
  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]

  resources :posts, only: [:create, :destroy]
  resources :box_memberships, only: [:create, :destroy]

  resources :soapboxes, only: [:create, :destroy, :index]
  resources :lockboxes, only: [:create, :destroy, :index]
  resources :mailboxes, only: [:create, :destroy, :index]

  root to: "soapboxes#index"
end
