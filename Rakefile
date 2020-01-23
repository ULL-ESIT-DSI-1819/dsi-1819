desc "Publicar en GitHub los apuntes de DSI"
task :default do
  sh "git ci -am 'curso 2019-2020' && git push"
end

desc "serve locally"
task :serve do
  sh "bundle exec jekyll serve --future --watch --port 8081"
end
