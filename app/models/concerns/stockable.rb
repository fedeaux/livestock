module Stockable
  extend ActiveSupport::Concern

  included do
    scope :idiv, ->{
      includes(:stock)
        .where('stocks.code IN (?)', Constants::IDIV.keys)
    }

    exposed_delegate :code, to: :stock
  end

  class_methods do
    # TODO: This looks broken
    def c(id_or_code)
      find_by_id_or_code(id_or_code)
    end

    def find_by_id_or_code(id_or_code)
      includes(:stock)
        .where(stocks: { id: id_or_code })
        .or(where(stocks: { code: id_or_code })).limit(1).first
    end
  end
end
