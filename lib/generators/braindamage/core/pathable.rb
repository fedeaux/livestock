module Pathable
  def frontend_base_path
    ""
  end

  def fe_generated_path
    "#{frontend_base_path}generated/"
  end

  def fe_app_path
    "#{frontend_base_path}app/"
  end

  def fe_framework_path
    "#{frontend_base_path}braindamage/"
  end

  def root_path
    Pathname.new "#{__dir__}/../../../.."
  end
end
