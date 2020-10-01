namespace :start do
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true run postinstall && foreman start'
  end
end
