class Stock < ApplicationRecord
  include Braindamageable
  validates :code, presence: {
    message: "Please provide a code"
  }

  exposed_enum risk: {
    0 => :none,
    10 => :low,
    20 => :moderate,
    30 => :high,
    40 => :incredible
  }, _suffix: true

  expose :link
  hide :created_at

  def link
    "https://www.fundsexplorer.com.br/funds/#{code}"
  end
end
