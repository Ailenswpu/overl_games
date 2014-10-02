QQ_CONNECT_KEY = "101157953"
QQ_CONNECT_SECRET = '46a685be800cff73385c52bafbeb326e'
WEIBO_KEY = '3825053910'
WEIBO_SECRET = '88374da69ba476c6a887ad8713b51c9c'
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :qq_connect, QQ_CONNECT_KEY, QQ_CONNECT_SECRET, scope: "get_user_info,add_share", provider_ignores_state: true
  provider :weibo, WEIBO_KEY, WEIBO_SECRET, provider_ignores_state: true
end


"https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101157953&redirect_uri=www.aabar.me/auth/qq_connect/callback&scope=get_user_info"