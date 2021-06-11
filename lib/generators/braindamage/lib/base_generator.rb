class BaseGenerator
  attr_reader :react_on_rails_generator
  delegate :name, :template, to: :react_on_rails_generator
  delegate :columns, to: :underlying_model

  def initialize(react_on_rails_generator)
    @react_on_rails_generator = react_on_rails_generator
  end

  def frontend_base_path
    "views/react_on_rails/"
  end

  def frontend_generated_path
    "#{frontend_base_path}generated/"
  end

  def frontend_app_path
    "#{frontend_base_path}app/"
  end

  def frontend_framework_path
    "#{frontend_base_path}framework/"
  end

  def exposed_attributes
    # TODO: Let the backend work with this list before
    columns
  end

  def underlying_model
    name.split('/').map(&:camelize).join('::').constantize
  end

  def root_path
    Pathname.new "#{__dir__}/../../../.."
  end

  def base_name
    name.split("/").last
  end

  def singular_underscore_name
    base_name.underscore.singularize
  end

  def plural_underscore_name
    base_name.underscore.pluralize
  end

  def singular_dash_name
    singular_underscore_name.gsub("_", "-")
  end

  def plural_dash_name
    plural_underscore_name.gsub("_", "-")
  end

  def singular_camel_name
    singular_underscore_name.camelize(:lower)
  end

  def plural_camel_name
    plural_underscore_name.camelize(:lower)
  end

  def singular_class_name
    singular_underscore_name.camelize
  end

  def plural_class_name
    plural_underscore_name.camelize
  end
end
