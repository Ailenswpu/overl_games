QQ_CONNECT_KEY = "101157953"
QQ_CONNECT_SECRET = '46a685be800cff73385c52bafbeb326e'
WEIBO_KEY = '2181659128'
WEIBO_SECRET = 'a81713e7d311d5f31ffcfd9ada9541bd'
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :qq_connect, QQ_CONNECT_KEY, QQ_CONNECT_SECRET, scope: "get_user_info,add_share", provider_ignores_state: true
  provider :weibo, WEIBO_KEY, WEIBO_SECRET, provider_ignores_state: true
end