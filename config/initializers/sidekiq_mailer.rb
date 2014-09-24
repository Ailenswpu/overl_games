# config/initializers/sidekiq_mailer.rb
Sidekiq::Mailer.excluded_environments = [:test, :cucumber]