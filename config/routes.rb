LotsOfBoxesApp::Application.routes.draw do
  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]

  resources :posts, only: [:create, :destroy]
  resources :box_memberships, only: [:create, :destroy]

  resources :soapboxes, only: [:create, :destroy, :index, :show]
  resources :lockboxes, only: [:create, :destroy, :index, :show]
  resources :mailboxes, only: [:create, :destroy, :index, :show]

  root to: "soapboxes#index"
end
