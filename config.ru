require 'sass/plugin/rack'

use Rack::Static,
  urls: ["/", "/images", "/js", "/css"],
  root: "public"

use Sass::Plugin::Rack

if ENV['RACK_ENV'] != 'production'
  use Rack::Static,
    urls: ['/css'],
    root: File.expand_path('../tmp', __FILE__)

  Sass::Plugin.options.merge!(template_location: 'public/css/sass',
                              css_location: 'public/css')
end

run lambda { |env|
  [
    200,
    { 
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
