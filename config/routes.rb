LotsOfBoxesApp::Application.routes.draw do
  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :destroy, :new]

  resources :posts, only: [:create, :destroy]
  resources :box_memberships, only: [:create, :destroy]
  resources :contacts, only: [:create, :destroy]

  resources :soapboxes, only: [:create, :destroy, :index, :show]
  resources :lockboxes, only: [:create, :destroy, :index, :show]
  resources :mailboxes, only: [:create, :destroy, :index, :show]

  # these "shows" are like the other boxes' "indexes"
  resource :inbox, only: [:show]
  resource :outbox, only: [:show]

  # home page w/ app description
  resource :home, only: :show
  root to: "homes#show"
end
