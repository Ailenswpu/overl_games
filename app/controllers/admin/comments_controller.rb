class Admin::CommentsController < ApplicationController
  http_basic_authenticate_with name: "admin", password: "admin"
  before_action :set_admin_comment, only: [:show, :edit, :update, :destroy]

  layout 'admin'
  # GET /admin/posts
  # GET /admin/posts.json
  def index
    @admin_comments = Comment.all
  end

  # DELETE /admin/posts/1
  # DELETE /admin/posts/1.json
  def destroy
    @admin_comment.destroy
    respond_to do |format|
      format.html { redirect_to admin_comments_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_comment
      @admin_comment = Comment.find(params[:id])
    end
end
