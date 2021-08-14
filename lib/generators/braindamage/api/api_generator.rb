require_relative "./lib/endpoint"
require_relative "./generators/api"

class Braindamage::ApiGenerator < Rails::Generators::Base
  BASE_PATH = "/lib/generators/braindamage/api/".freeze # ugly!
  source_root File.expand_path("generators/", __dir__)

  def all
    @current_generator = Generators::Api.new(self, endpoints)
    @current_generator.generate
  end

  private

  def method_missing(name, *args)
    super unless @current_generator.respond_to?(name)
    @current_generator.send(name, *args)
  end

  def endpoints
    @endpoints ||= Rails.application.routes.routes.map do |route|
      Endpoint.new route
    end.select(&:generateable?)
  end
end
