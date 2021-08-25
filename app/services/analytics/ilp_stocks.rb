class Analytics::IlpStocks
  def initialize
    ActiveRecord::Base.logger = nil
  end

  def calculate
    m = Cbc::Model.new
    selection_count = 10

    prefix_vars = {}
    sector_vars = {}

    blacklist = %w[
      JBSS
      CMIG4 GEPA
    ]
      # APTI CYRE ABCB BEES BMEB BRSR SANB BRGE ENBR
      # CMIG GEPA
      # EVEN
      # PEAB
      # PSSA

    stocks = Stock.all.order('name').map do |stock|
      stock_kpi = stock.stock_kpis.last
      prefix = stock.code.gsub(/\d/, '')

      if !blacklist.include?(prefix) &&
         stock.sector &&
         stock_kpi &&
         stock_kpi.ev_to_ebit >= 0.03 &&
         stock_kpi.opdy >= 5 &&
         stock_kpi.ddpy >= 3

        selected_var = m.int_var(0..1, name: stock.code)
        prefix_vars[prefix] ||= []
        prefix_vars[prefix].push(selected_var)
        sector_vars[stock.sector] ||= []
        sector_vars[stock.sector].push(selected_var)

        OpenStruct.new(
          code: stock.code,
          ev_ebit: stock_kpi.ev_to_ebit.to_f,
          opdy: stock_kpi.opdy.to_f,
          selected: selected_var,
          selected_var_name: stock.code,
          status_invest_url: stock.status_invest_url,
          sector: stock.sector
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
      end.reduce(&:+) == selection_count
    )

    prefix_vars.values.each do |vars|
      m.enforce(
        vars.reduce(&:+) <= 1
      )
    end

    sector_vars.values.each do |vars|
      m.enforce(
        vars.reduce(&:+) <= selection_count / 5
      )
    end

    p = m.to_problem

    p.solve

    puts m

    unless p.proven_infeasible?
      stocks.select do |stock|
        p.value_of(stock.selected) > 0
      end.sort_by(&:code).sort_by(&:sector).each do |stock|
        puts "#{stock.selected_var_name}: #{stock.opdy} #{stock.status_invest_url} #{stock.sector}"
      end
    end

    nil
  end
end
