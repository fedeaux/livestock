class Braindamage::Attribute
  attr_accessor :name
  attr_accessor :type
  attr_accessor :writeable

  def initialize(name, type, writeable = true)
    self.name = name.to_s
    self.type = type.to_s
    self.writeable = writeable
  end
end
