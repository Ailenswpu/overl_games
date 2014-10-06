json.array!(@admin_users) do |admin_user|
  json.extract! admin_user, :id, :provider, :uid, :created_at
  json.url admin_user_url(admin_user, format: :json)
end
