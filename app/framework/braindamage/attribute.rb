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

  def fe_name
    unless @fe_name
      @fe_name = name.to_s

      if @fe_name.ends_with? "?"
        @fe_name = "is_#{@fe_name.gsub(/\?$/, '')}"
      end

      @fe_name = @fe_name.camelcase(:lower)
    end

    @fe_name
  end

  option :name, nil
  option :type, "string"
  option :writeable, true
  option :default, nil
end
