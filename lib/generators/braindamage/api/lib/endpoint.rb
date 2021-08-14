require_relative '../../core/entity'
require_relative './path_part'

class Endpoint
  API_PREFIX = "/api/"
  attr_reader :route

  delegate :verb, to: :route

  def initialize(route)
    @route = route
  end

  def generate
    puts full_path
    # puts api_signature
  end

  def api_signature
    entities_signature
  end

  def full_path
    @full_path ||= route.path.spec.to_s
  end

  def path
    @path ||= full_path.gsub(API_PREFIX, "").gsub("(.:format)", "")
  end

  def path_parts
    @path_parts = path.split("/").map do |path_part|
      PathPart.new path_part
    end
  end

  def api?
    full_path.starts_with? API_PREFIX
  end

  def entities
    unless @entities
      current_entities_names = []
      @entities = []

      path_parts.each do |path_part|
        if path_part.param? && current_entities_names.any?
          @entities << Entity.new(current_entities_names.join("_"))
          current_entities_names = []
        else
          current_entities_names << path_part.path_part
        end
      end

      @entities << Entity.new(current_entities_names.join("_")) if current_entities_names.any?
    end

    @entities
  end

  def params
    @params ||= path_parts.select(&:param?).map do |path_part|
      Entity.new(path_part.path_part.gsub(/^:/, ''))
    end
  end

  def hook_signature
    return read_hook_signature if read?

    write_hook_signature
  end

  def hook_params
    params.map(&:singular_camel_name)
  end

  def path_with_verb
    @path_with_verb ||= "#{verb} #{path}"
  end

  def generateable?
    api? && !patch?
  end

  def patch?
    verb == "PATCH"
  end

  def read?
    verb == "GET"
  end

  def read_hook_signature
    entities_signature = if path_parts.last.param?
                           member_entities_signature
                         else
                           collection_entities_signature
                         end

    "with#{entities_signature}(#{hook_params})"
  end

  def write_hook_signature
    hook_verb_signature = if verb == "POST"
                            "Create"
                          elsif verb == "DELETE"
                            "Destroy"
                          else
                            "Update"
                          end

    "with#{hook_verb_signature}#{member_entities_signature}(#{hook_params})"
  end

  def hook_params
    ["Component", params.map(&:singular_camel_name), "params = {}", "options = {}"]
      .flatten.join ", "
  end

  def hook_filename
    (entities[0..-2].map(&:singular_dash_name) + [entities.last.plural_dash_name]).join("-") + ".js"
  end

  def member_entities_signature
    entities.map(&:singular_class_name).join
  end

  def collection_entities_signature
    (entities[0..-2].map(&:singular_class_name) + [entities.last.plural_class_name]).join
  end
end
