class Braindamage::AttributeOptions
  def initialize(hash)
    @hash = hash
  end

  def name
    @hash[:name].to_s
  end

  def type
    return @hash[:type].to_s if @hash.key?(:type)

    "string"
  end

  def writeable
    return @hash[:writeable] if @hash.key?(:writeable)

    true
  end

  def readable
    return @hash[:readable] if @hash.key?(:readable)

    true
  end
end
