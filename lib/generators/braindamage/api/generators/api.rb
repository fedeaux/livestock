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
      [read_collection_hooks, read_member_hooks, put_hooks, post_hooks, delete_hooks].flatten.join("\n\n").strip
    end

    def read_member_hooks
      endpoints.select(&:read?).select(&:member?).map do |endpoint|
        param_names = ['endpoint', endpoint.instantiable_model_name].concat endpoint.params_names

        "export function #{endpoint.hook_signature} {
  const endpoint = #{endpoint.parameterized_api_path};
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, #{endpoint.abstract_api_function}, [#{param_names.join(', ')}]);
}"
      end
    end

    def read_collection_hooks
      endpoints.select(&:read?).select(&:collection?).map do |endpoint|
        param_names = ['endpoint', endpoint.instantiable_model_name].concat endpoint.params_names

        "export function #{endpoint.hook_signature} {
  const endpoint = #{endpoint.parameterized_api_path};
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, #{endpoint.abstract_api_function}, [#{param_names.join(', ')}]);
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

    def post_hooks
      endpoints.select(&:post?).map do |endpoint|
        "export function #{endpoint.hook_signature} {
  const { write: create, ...rest } = useWrite(#{endpoint.abstract_api_function}, [#{endpoint.parameterized_api_path}, #{endpoint.instantiable_model_name}]);

  return { create, ...rest };
}"
      end
    end

    def delete_hooks
      endpoints.select(&:delete?).map do |endpoint|
        "export function #{endpoint.hook_signature} {
  const { write: destroy, ...rest } = useWrite(#{endpoint.abstract_api_function}, [#{endpoint.parameterized_api_path}, #{endpoint.instantiable_model_name}]);

  return { destroy, ...rest };
}"
      end
    end
  end
end
