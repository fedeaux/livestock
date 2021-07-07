class Stock < ApplicationRecord
  include Braindamageable

  validates :code, presence: {
    message: "Please provide a code"
  }

  expose :link
  hide :created_at

  def link
    "https://www.fundsexplorer.com.br/funds/#{code}"
  end
end
