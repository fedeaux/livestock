module Generators
  module Fe
    class Schema < BaseGenerator
      def generate
        target = root_path.join "app/javascript/generated/schemas/#{singular_underscore_name}.js"
        source = "fe/schema/schema.template.js.erb"

        template source, target
      end
    end
  end
end

# Honorable mentions
# ap underlying_model.attributes_to_define_after_schema_loads
# ap underlying_model.local_stored_attributes
# ap underlying_model.stored_attributes
# ap underlying_model.attributes_builder
