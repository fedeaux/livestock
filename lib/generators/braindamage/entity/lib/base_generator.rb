require_relative '../../core/nameable'

class BaseGenerator
  include Nameable
  attr_reader :braindamage_generator
  delegate :name, :template, to: :braindamage_generator
  delegate :exposed_attributes, to: :model

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

  def root_path
    Pathname.new "#{__dir__}/../../../../.."
  end
end
