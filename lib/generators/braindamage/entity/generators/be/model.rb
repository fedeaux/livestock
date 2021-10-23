module Generators
  module Be
    class Model < EntityGenerator
      def self.order
        0
      end

      def generate
        target = root_path.join "app/models/#{singular_underscore_name}.rb"
        inject_into_file target, after: "ApplicationRecord\n" do
"  include Braindamage::Braindamageable\n"
        end
      end
    end
  end
end
