class UserStockProjector < ApplicationProjector
  def initialize
    super UserStock
  end

  def exposed_attributes
    super.concat([
      Braindamage::Attribute.new(
        :link,
        :string,
        false,
      )
    ])
  end
end
