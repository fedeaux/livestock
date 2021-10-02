module Stockable
  extend ActiveSupport::Concern

  included do
    scope :idiv, ->{
      includes(:stock)
        .where('stocks.code IN (?)', Constants::IDIV.keys)
    }
  end

  class_methods do
    def c(id_or_code)
      find_by_id_or_code(id_or_code)
    end

    def find_by_id_or_code(id_or_code)
      includes(:stock)
        .where(stock: { id: id_or_code })
        .or(where(stock: { code: id_or_code })).limit(1).first
    end
  end
end
