class Stock < ApplicationRecord
  include Braindamageable

  validates :code, presence: {
    message: "Please provide a code"
  }

  exposed_enum risk: {
    none: 0,
    low: 10,
    moderate: 20,
    high: 30,
    incredible: 40
  }, _suffix: true

  expose :link
  hide :created_at

  def link
    "https://www.marketwatch.com/investing/stock/#{code}"
  end
end

# ╰─$ ls Work/open-source/rails-6.1.3/activerecord/lib/active_record/validations/
# absence.rb
# associated.rb <= async
# length.rb
# numericality.rb
# presence.rb
# uniqueness.rb <= async
