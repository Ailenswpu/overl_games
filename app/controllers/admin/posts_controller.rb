class Admin::PostsController < ApplicationController
  http_basic_authenticate_with name: 'admin321', password: 'admin!@#$1234adminqwert'
  before_action :set_admin_post, only: [:show, :edit, :update, :destroy, :review]

  layout 'admin'
  # GET /admin/posts
  # GET /admin/posts.json
  def index
    @admin_posts = Post.all.order(created_at: :desc)
  end

  # GET /admin/posts/1
  # GET /admin/posts/1.json
  def show
    
  end

  # GET /admin/posts/new
  def new
    @admin_post = Post.new
  end

  # GET /admin/posts/1/edit
  def edit

  end

  # POST /admin/posts
  # POST /admin/posts.json
  def create
    @admin_post = Post.new(admin_post_params)

    respond_to do |format|
      if @admin_post.save
        format.html { redirect_to @admin_post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @admin_post }
      else
        format.html { render :new }
        format.json { render json: @admin_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/posts/1
  # PATCH/PUT /admin/posts/1.json
  def update
    if @admin_post.update(admin_post_params)
      redirect_to admin_posts_path
    else
      redirect_to edit_admin_post_path(@admin_post)
    end
  end
  
  def review
    @admin_post.update_attributes(status: 1)
    redirect_to admin_posts_path
  end

  # DELETE /admin/posts/1
  # DELETE /admin/posts/1.json
  def destroy
    @admin_post.destroy
    respond_to do |format|
      format.html { redirect_to admin_posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_admin_post
    @admin_post = Post.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def admin_post_params
    params.require(:post).permit(:title, :description, :icon, :user_id, :ios, :android, :windows, :web, :visit, :category_id, :comments_count, :votes_count)
  end
end
