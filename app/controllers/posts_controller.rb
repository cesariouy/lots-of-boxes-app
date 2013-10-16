class PostsController < ApplicationController
  def create
    @post = Post.new(params[:post])

    if @post.save
      render json: @post.to_json
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])
    box = @post.box
    @post.destroy
    box.destroy if box.posts.empty?

    redirect_to outbox_url
  end
end
