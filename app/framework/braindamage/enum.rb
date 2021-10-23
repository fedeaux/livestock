class Braindamage::Enum < Braindamage::Struct
  property :name, nil
  property :value_map, {}
  property :options, {}

  def fe_name
    name.to_s.camelcase(:lower)
  end

  def pretty_printable
    {
      name: fe_name,
      value_map: value_map,
      options: options
    }
  end
end
