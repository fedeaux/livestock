module Generators
  module Be
    class Views < BaseGenerator
      def generate
        base_target = "app/views/api/#{plural_underscore_name}"

        ['index', '_attributes', '_member'].each do |partial_name|
          target = root_path.join "#{base_target}/#{partial_name}.json.jbuilder"
          source = "be/views/#{partial_name}.json.jbuilder.erb"
          template source, target
        end
      end
    end
  end
end
