require_relative "./lib/entity_generator"
require_relative "./lib/fe_generator"

class Braindamage::EntityGenerator < Rails::Generators::NamedBase
  BASE_PATH = "/lib/generators/braindamage/entity/".freeze # ugly!
  source_root File.expand_path("generators/", __dir__)
  class_option :smart, type: :boolean, default: true

  def all
    active_generators.each do |generator|
      # `Indecent exposure` for now
      @current_generator = generator.new(self)
      @current_generator.generate
    end
  end

  private

  def method_missing(name, *args)
    super unless @current_generator.respond_to?(name)
    @current_generator.send(name, *args)
  end

  def active_generators
    active_generators_paths = Dir["#{__dir__}/generators/**/*.rb"]

    active_generators_paths.each { |f| require f }

    active_generators_paths.map do |generator_path|
      path_2_generator generator_path.split(".")[0..-2].join "."
    end
  end

  def path_2_generator(path)
    path.split(BASE_PATH).last.split("/").map(&:camelize).join("::").constantize
  end
end
