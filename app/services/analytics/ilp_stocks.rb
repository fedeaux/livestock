class Analytics::IlpStocks
  def initialize
    ActiveRecord::Base.logger = nil
  end

  def calculate
    m = Cbc::Model.new

    prefix_vars = {}

    blacklist = %w[
      APTI CYRE ABCB BEES BMEB BRSR SANB BRGE ENBR
      CMIG GEPA
      EVEN
      PEAB
      PSSA
    ]

    stocks = Stock.all.order('name').map do |stock|
      stock_kpi = stock.stock_kpis.last
      prefix = stock.code.gsub(/\d/, '')
      selected_var = m.int_var(0..2, name: stock.code)
      prefix_vars[prefix] ||= []
      prefix_vars[prefix].push(selected_var)

      if !blacklist.include?(prefix) && stock_kpi && stock_kpi.ev_to_ebit >= 0.03 && stock_kpi.opdy >= 5 && stock_kpi.ddpy >= 3
        OpenStruct.new(
          code: stock.code,
          ev_ebit: stock_kpi.ev_to_ebit.to_f,
          opdy: stock_kpi.opdy.to_f,
          selected: selected_var,
          selected_var_name: stock.code,
          status_invest_url: stock.status_invest_url
        )
      end
    end.compact

    m.minimize(
      stocks.map do |stock_var|
        stock_var.selected * stock_var.ev_ebit
      end.reduce(&:+)
    )

    m.enforce(
      stocks.map do |stock_var|
        stock_var.selected * stock_var.opdy
      end.reduce(&:+) >= 7
    )

    m.enforce(
      stocks.map do |stock_var|
        stock_var.selected
      end.reduce(&:+) == 30
    )

    prefix_vars.values.each do |vars|
      m.enforce(
        vars.reduce(&:+) <= 2
      )
    end

    p = m.to_problem

    p.solve

    puts m

    unless p.proven_infeasible?
      stocks.select do |stock|
        p.value_of(stock.selected) > 0
      end.sort_by(&:code).each do |stock|
        puts "#{stock.selected_var_name}: #{stock.opdy} #{stock.status_invest_url}"
      end
    end

    nil
  end
end
