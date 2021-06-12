class Braindamage::Attribute
  delegate :name, :type, :writeable, to: :@options

  def initialize(options)
    @options = Braindamage::AttributeOptions.new options
  end
end
