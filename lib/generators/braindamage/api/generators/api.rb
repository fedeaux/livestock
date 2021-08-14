require_relative '../../core/base_generator'

module Generators
  class Api < BaseGenerator
    attr_accessor :endpoints

    def initialize(braindamage_generator, endpoints)
      @endpoints = endpoints
      super braindamage_generator
    end

    def generate
      models_to_import = endpoints.map do |endpoint|
        endpoint.entities.map(&:singular_class_name)
      end.flatten.compact.uniq.sort

      ap models_to_import

      target = root_path.join "app/javascript/generated/api.js"
      source = "api/api.template.js.erb"

      # template source, target
    end

    def models_imports
      "import UserStockEarning from 'models/user_stock_earning';"
    end

    def hooks
      "export function useUserStockEarnings() {
  return useQuery(getModelCollection, ['user_stock_earnings', UserStockEarning]);
}"
    end
  end
end

# Honorable mentions
# ap underlying_model.attributes_to_define_after_schema_loads
# ap underlying_model.local_stored_attributes
# ap underlying_model.stored_attributes
# ap underlying_model.attributes_builder
