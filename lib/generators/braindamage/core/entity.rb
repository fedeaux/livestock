require_relative './nameable'
require_relative './pathable'

class Entity
  include Nameable
  include Pathable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def fe_model_path
    "models/#{singular_underscore_name}"
  end

  def fe_import_model
    "import #{singular_class_name} from '#{fe_model_path}';"
  end

  def fe_schema_path
    "#{fe_generated_path}schemas/#{singular_underscore_name}"
  end

  def fe_import_schema
    "import #{singular_class_name}Schema from '#{fe_schema_path}';"
  end
end
