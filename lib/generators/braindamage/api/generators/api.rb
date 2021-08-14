require_relative '../../core/base_generator'

module Generators
  class Api < BaseGenerator
    attr_accessor :endpoints

    def initialize(braindamage_generator, endpoints)
      @endpoints = endpoints
      super braindamage_generator
    end

    def generate
      target = root_path.join "app/javascript/generated/api.js"
      source = "api/api.template.js.erb"

      template source, target
    end

    def models_imports
      unique_entities = {}

      endpoints.each do |endpoint|
        endpoint.entities.each do |entity|
          unique_entities[entity.singular_camel_name] = entity
        end
      end

      unique_entities.values.map(&:fe_import_model).sort.join "\n"
    end

    def hooks
      endpoints.select(&:read?).map do |endpoint|
        "export function #{endpoint.hook_signature} {
  return useQuery(#{endpoint.abstract_api_function}, [#{endpoint.parameterized_api_path}, #{endpoint.instantiable_model_name}]);
}"
      end.join("\n\n").strip
    end
  end
end
