QQ_CONNECT_KEY = "101157953"
QQ_CONNECT_SECRET = '46a685be800cff73385c52bafbeb326e'
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :qq_connect, QQ_CONNECT_KEY, QQ_CONNECT_SECRET, scope: "get_user_info,add_share",:provider_ignores_state => true
end


"https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101157953&redirect_uri=www.aabar.me/auth/qq_connect/callback&scope=get_user_info"