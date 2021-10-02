require_relative '../../core/entity'
require_relative './path_part'

class Endpoint
  API_PREFIX = "/api/"
  attr_reader :route

  delegate :verb, to: :route

  def initialize(route)
    @route = route
  end

  def full_path
    @full_path ||= route.path.spec.to_s
  end

  def hook_signature
    entities_signature = if path_parts.last.param?
                           entities.map(&:singular_class_name).join
                         else
                           (entities[0..-2].map(&:singular_class_name) + [entities.last.plural_class_name]).join
                         end

    params_signature = params.map(&:singular_camel_name).join(', ')

    if read?
      "useApi#{entities_signature}(#{params_signature})"
    elsif put?
      "useApiUpdate#{entities_signature}(#{params_signature})"
    end
  end

  def abstract_api_function
    if path_parts.last.param?
      'getModelMember'
    else
      'getModelCollection'
    end
  end

  def instantiable_model_name
    entitify_path_parts!

    @entities.last.singular_class_name
  end

  def api_path
    @api_path ||= full_path.gsub("(.:format)", "")
  end

  def path
    @path ||= full_path.gsub(API_PREFIX, '').gsub('(.:format)', '')
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
    entitify_path_parts!

    @entities

    # unless @entities
    #   current_entities_names = []
    #   @entities = []

    #   path_parts.each do |path_part|
    #     if path_part.param? && current_entities_names.any?
    #       @entities << Entity.new(current_entities_names.join("_"))
    #       current_entities_names = []
    #     else
    #       current_entities_names << path_part.path_part
    #     end
    #   end

    #   @entities << Entity.new(current_entities_names.join("_")) if current_entities_names.any?
    # end

    # @entities
  end

  def params
    entitify_path_parts!

    @params
  end

  def parameterized_api_path
    entitify_path_parts!
    parameterized_path_parts = [API_PREFIX]
    next_param_index = 0

    path_parts.each do |path_part|
      if path_part.entity?
        parameterized_path_parts << path_part.path_part
      else
        param_singular_camel_name = @params[next_param_index].singular_camel_name
        next_param_index += 1
        parameterized_path_parts << "${#{param_singular_camel_name}}"
      end
    end

    parameterized_path_str = parameterized_path_parts.join('/').gsub('//', '/')

    if next_param_index.zero?
      "'#{parameterized_path_str}'"
    else
      "`#{parameterized_path_str}`"
    end
  end

  def entitify_path_parts!
    return if @entitified_path_parts

    @entities = []
    @params = []

    path_parts.each do |path_part|
      if path_part.entity?
        @entities << Entity.new(path_part.path_part)
      else
        last_entity_singular_underscore_name = @entities.last.singular_underscore_name
        @params << Entity.new("#{last_entity_singular_underscore_name}_#{path_part.path_part.gsub(/^:/, '')}")
      end
    end

    @entitified_path_parts = true
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

  def put?
    verb == "PUT"
  end
end

# def api_signature
#   entities_signature
# end

# def hook_signature
#   return read_hook_signature if read?

#   write_hook_signature
# end

# def hook_params
#   params.map(&:singular_camel_name)
# end


# def hook_params
#   ["Component", params.map(&:singular_camel_name), "params = {}", "options = {}"]
#     .flatten.join ", "
# end

# def hook_filename
#   (entities[0..-2].map(&:singular_dash_name) + [entities.last.plural_dash_name]).join("-") + ".js"
# end

# def read_hook_signature
#   entities_signature = if path_parts.last.param?
#                          member_entities_signature
#                        else
#                          collection_entities_signature
#                        end

#   "with#{entities_signature}(#{hook_params})"
# end

# def write_hook_signature
#   hook_verb_signature = if verb == "POST"
#                           "Create"
#                         elsif verb == "DELETE"
#                           "Destroy"
#                         else
#                           "Update"
#                         end

#   "with#{hook_verb_signature}#{member_entities_signature}(#{hook_params})"
# end
