desc "Publicar en dsi1819 los apuntes de DSI"
task :default do
  sh "git ci -am 'curso 2019-2020' && git push dsi1819 master"
end

desc "Publicar en 1920 los apuntes de DSI"
task :pub1920 do
  sh "git ci -am 'curso 2019-2020' && git push origin master"
end

desc "serve locally"
task :serve do
  sh "bundle exec jekyll serve --future --watch --port 8081"
end

require 'html-proofer'
desc "test links in the build web site"
task :test do
  sh "bundle exec jekyll build"
  options = { 
    :assume_extension => true, 
    :disable_external => true, 
    :empty_alt_ignore => true,
    :file_ignore => [ %r{categories} ]
  }
  HTMLProofer.check_directory("./_site", options).run
end