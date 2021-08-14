module Generators
  module Be
    class Controller < EntityGenerator
      def generate
        target = root_path.join "app/controllers/api/#{plural_underscore_name}_controller.rb"
        source = "be/controller/controller.template.rb.erb"

        template source, target
      end
    end
  end
end
