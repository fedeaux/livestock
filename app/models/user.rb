class User < ApplicationRecord
  include Braindamage::Braindamageable
  has_many :user_stocks
  has_many :wallets
  has_many :stocks, through: :user_stocks
  has_many :user_stock_earnings, through: :user_stocks
end

# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
