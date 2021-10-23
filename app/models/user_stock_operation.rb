class UserStockOperation < ApplicationRecord
  include Braindamage::Braindamageable

  belongs_to :user_stock
  expose_associations

  exposed_enum nature: {
    buy: 0,
    sell: 10
  }

  before_save :ensure_total

  def ensure_total
    self.total = stock_price * stock_count
  end
end

# == Schema Information
#
# Table name: user_stock_operations
#
#  id            :bigint           not null, primary key
#  executed_at   :date
#  nature        :integer
#  stock_count   :integer
#  stock_price   :decimal(15, 2)
#  total         :decimal(15, 2)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_stock_id :bigint           not null
#
# Indexes
#
#  index_user_stock_operations_on_user_stock_id  (user_stock_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_stock_id => user_stocks.id)
#
