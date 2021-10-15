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
      [read_hooks, put_hooks].flatten.join("\n\n").strip
    end

    def read_hooks
      endpoints.select(&:read?).map do |endpoint|
        "export function #{endpoint.hook_signature} {
  const queryCacheKey = #{endpoint.parameterized_api_path};

  return useQuery(queryCacheKey, #{endpoint.abstract_api_function}, [queryCacheKey, #{endpoint.instantiable_model_name}]);
}"
      end
    end

    def put_hooks
      endpoints.select(&:put?).map do |endpoint|
        "export function #{endpoint.hook_signature} {
  const { write: update, ...rest } = useWrite(#{endpoint.abstract_api_function}, [#{endpoint.parameterized_api_path}, #{endpoint.instantiable_model_name}]);

  return { update, ...rest };
}"
      end
    end
  end
end
