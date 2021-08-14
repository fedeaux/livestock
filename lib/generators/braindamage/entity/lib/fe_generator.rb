class FeGenerator < EntityGenerator
  def name_map
    name_methods.map do |name_method|
      [name_method.to_s.camelize(:lower).gsub(/Name$/, ''), send(name_method)]
    end.to_h
  end

  def printable_validators
    validators.map do |validator|
      {
        class_name: validator.class.name,
        options: validator.options,
        attributes: validator.attributes
      }
    end
  end
end
