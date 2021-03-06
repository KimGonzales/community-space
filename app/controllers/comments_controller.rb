require 'pry'

class CommentsController < ApplicationController

    # skip_before_action :verify_authenticity_token
    # before_action :require_login

    def index
        @discussion = Discussion.find(params[:discussion_id])
        @comments = @discussion.comments
        render json: @comments.as_json(only: [:id, :text, :discussion_id], include: 'discussion') 
        @comment = Comment.new(discussion_id: params[:discussion_id])
    end

    def new
        @comment = Comment.new(discussion_id: params[:discussion_id])
    end

    def create
        @comment = Comment.new(comment_params)

        if @comment.save
            render json: @comment.as_json(only: [:id, :text, :discussion_id])
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def show
        @comment = Comment.find_by(id: params[:id])
        render json: @comment
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        @comment.destroy
        render json: @comment.as_json(only: [:id])
    end

    private

    def comment_params
        params.require(:comment).permit(:text, :discussion_id)
    end

end
