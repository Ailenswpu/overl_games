json.array!(@admin_posts) do |admin_post|
  json.extract! admin_post, :id, :title, :description, :icon, :user_id, :ios, :android, :windows, :web, :visit, :category_id, :comments_count, :votes_count
  json.url admin_post_url(admin_post, format: :json)
end
