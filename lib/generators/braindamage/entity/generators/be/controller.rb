module Generators
  module Be
    class Controller < BaseGenerator
      def generate
        return

        target = root_path.join "app/controllers/api/#{plural_underscore_name}_controller.rb"
        source = "be/controller/controller.template.rb.erb"

        template source, target
      end
    end
  end
end
