class FeGenerator < BaseGenerator
  def base_path
    ""
  end

  def generated_path
    "#{frontend_base_path}generated/"
  end

  def app_path
    "#{frontend_base_path}app/"
  end

  def framework_path
    "#{frontend_base_path}framework/"
  end

  def name_map
    name_methods.map do |name_method|
      [name_method.to_s.camelize(:lower).gsub(/Name$/, ''), send(name_method)]
    end.to_h
  end
end
