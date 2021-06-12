class ApplicationProjector
  attr_accessor :model
  attr_accessor :instance
  delegate :columns, to: :model

  def initialize(model)
    self.model = model
    self.instance = model.new
  end

  def exposed_attributes
    columns.map do |column|
      Braindamage::Attribute.new(column.name, column.type)
    end
  end
end
