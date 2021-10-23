class Braindamage::Struct
  def initialize(properties)
    @properties = properties
  end

  def self.property(name, default)
    define_method(name) {
      return @properties[name] if @properties.key?(name)

      default
    }

    define_method("#{name}=") { |value|
      @properties[name] = value
    }
  end

  property :name, nil
  property :type, "string"
  property :writeable, true
  property :default, nil
end
