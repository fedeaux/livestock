class Simulators::MonthlyBuySimulator < Simulators::InvestmentSimulator
  attr_accessor :start_month, :stock_picker, :finish_month

  def initialize(
        start_month: '2018-01',
        finish_month: Date.today.to_s("%Y-%m"),
        stock_picker: nil
      )

    self.start_month = Date.strptime(start_month&.strip, "%Y-%m")
    self.finish_month = Date.strptime(finish_month&.strip, "%Y-%m")
    self.stock_picker = stock_picker
    ActiveRecord::Base.logger = nil
  end

  def months
    current_month = self.start_month

    while current_month <= finish_month
      current_month = current_month + 1.month
      yield current_month
    end
  end

  def from_them_to_now
    current_month = self.finish_month
    now_month = Date.current.beginning_of_month - 1.month

    while current_month < now_month
      current_month = current_month + 1.month
      yield current_month
    end
  end
end
