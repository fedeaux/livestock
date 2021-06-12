class Stock < ApplicationRecord
  include Braindamageable

  expose :link
  hide :created_at

  def link
    "https://www.fundsexplorer.com.br/funds/#{code}"
  end
end
