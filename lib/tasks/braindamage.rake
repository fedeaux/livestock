# frozen_string_literal: true

namespace :braindamage do
  desc 'Regenerate all entities'
  task regenerate: :environment do
    Dir.glob("#{Rails.root.join('app/javascript/generated/schemas/').to_s}*.js").each do |schema_path|
      singular_underscore_name = schema_path.split('/').last.split('.')[0..-2].join('.')
      cmd = "rails g braindamage:entity #{singular_underscore_name} --dumb"
      puts cmd
      # puts `#{cmd}`
    end

    cmd = "rails g braindamage:api"
    puts cmd
    # puts `#{cmd}`
  end
end
