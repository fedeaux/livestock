class UserStock < ApplicationRecord
  include Braindamageable

  belongs_to :user
  belongs_to :stock
end
