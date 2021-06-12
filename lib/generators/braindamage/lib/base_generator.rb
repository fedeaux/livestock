class BaseGenerator
  attr_reader :braindamage_generator
  delegate :name, :template, to: :braindamage_generator
  delegate :projector, to: :model
  delegate :exposed_attributes, to: :projector

  def initialize(braindamage_generator)
    @braindamage_generator = braindamage_generator
  end

  def frontend_base_path
    ""
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

  def model
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

  def name_methods
    %i[
      singular_underscore_name
      plural_underscore_name
      singular_dash_name
      plural_dash_name
      singular_camel_name
      plural_camel_name
      singular_class_name
      plural_class_name
      ]
  end
end
