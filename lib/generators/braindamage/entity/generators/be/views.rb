module Generators
  module Be
    class Views < EntityGenerator
      def generate
        base_target = "app/views/api/#{plural_underscore_name}"

        ['index', '_attributes', '_member', 'show', 'update', 'create', 'destroy'].each do |partial_name|
          target = root_path.join "#{base_target}/#{partial_name}.json.jbuilder"
          source = "be/views/#{partial_name}.json.jbuilder.erb"
          template source, target
        end
      end
    end
  end
end
