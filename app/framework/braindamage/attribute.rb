class Braindamage::Attribute
  def initialize(options)
    @options = options
  end

  def self.option(name, default)
    define_method(name) {
      return @options[name] if @options.key?(name)

      default
    }

    define_method("#{name}=") { |value|
      @options[name] = value
    }
  end

  option :name, nil
  option :type, "string"
  option :writeable, true
  option :default, nil
end
