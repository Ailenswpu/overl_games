redis = Redis.new
redis.select(3)
$redis = Redis::Namespace.new("overlgames:accounts", :redis => redis)