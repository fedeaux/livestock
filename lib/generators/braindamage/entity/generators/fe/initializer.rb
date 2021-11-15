module Generators
  module Fe
    class Initializer < FeGenerator
      def self.order
        9999
      end

      def generate
        target = root_path.join "app/javascript/generated/initializer.js"
        source = "fe/initializer/initializer.template.js.erb"

        template source, target
      end
    end
  end
end
