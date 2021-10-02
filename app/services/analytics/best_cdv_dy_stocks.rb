class Analytics::BestCdvDyStocks
  STOCK_BLACKLIST = %w[JBSS3 BRSR6]

  CDV_LIST = %w[
    DMMO3
    MNPR3
    ENAT3
    CMIN3
    USIM5
    CSNA3
    GOAU4
    LAVV3
    PLPL3
    PETR4
    EUCA4
    MRFG3
    VALE3
    ALUP11
    BRKM5
    TASA4
    JALL3
    EVEN3
    CMIG4
    TAEE11
    CLSC4
    TRPL4
    WIZS3
    JHSF3
    BEEF3
    SAPR11
    PCAR3
    CSMG3
    GGBR4
    UNIP6
    ALLD3
    CGRA4
    LIGT3
    ENBR3
    DEXP3
    JBSS3
    SEER3
    CYRE3
    SLCE3
    CPLE6
  ]

  def initialize
    ActiveRecord::Base.logger = nil
  end

  def calculate
    fields = { ev_to_ebit: {}, opdy: {} }

    fields.keys.each do |field|
      puts "\nFIELD: #{field}"
      fields[field] = average_and_standard_deviation(field)
      fields[field].each do |metric, value|
        puts "#{metric}: #{value}"
      end
    end

    stocks = best_stocks_kpis.to_a

    stocks.each do |kpi|
      fields.each do |key, field|
        kpi.send("#{key}_deviation=", kpi.deviation(key, field[:sd], field[:average]))
      end
    end

    puts "Total: #{stocks.count}"
    # stocks.sort_by!(&:crazy_metric).reverse!

    # average_ev_to_ebit = best_stocks_kpis.average(:ev_to_ebit)
    # average_opdy = best_stocks_kpis.average(:opdy)

    # puts "average_ev_to_ebit #{average_ev_to_ebit}"
    # puts "average_opdy #{average_opdy}"

    without_repetition stocks, "\nBest Stocks:"
    # without_repetition "opdy DESC", "By opdy"
    nil
  end

  def average_and_standard_deviation(field)
    average = best_stocks_kpis.average(field)
    variation = best_stocks_kpis.map { |sk| (sk.send(field) - average)**2 }.sum / best_stocks_kpis.count
    sd = Math.sqrt(variation)

    {
      min: best_stocks_kpis.minimum(field),
      average: average,
      max: best_stocks_kpis.maximum(field),
      sd: sd,
    }
  end

  def without_repetition(stocks, title)
    stock_code_map = {}
    stock_count = 0

    stocks.each do |stock_kpi|
      normalized_code = stock_kpi.code.gsub(/\d+/, '')

      unless stock_code_map[normalized_code]
        stock_code_map[normalized_code] = stock_kpi
        stock_count += 1
      end

      if stock_count > 19
        break
      end
    end

    to_print = [:crazy_metric, :ev_to_ebit, :opdy, :ev_to_ebit_deviation, :opdy_deviation]

    puts title
    tp stock_code_map.values, :'stock.code', :ev_to_ebit, :dy, :'stock.sector', :'stock.subsector', :'stock.segment', 'stock.status_invest_url' => { width: 124312412 }

    puts "\nCandidates:"
    puts stock_code_map.values.map(&:code).join ' '

    # a = (stock_code_map.values.map do |sk|
    #        fields = to_print.map do |f|
    #          sk.send(f)
    #        end

    #        [sk.stock.code, fields, sk.stock.status_invest_url].flatten.join ';'
    #      end.join "\n")

    # puts ["code", to_print].flatten.join ';'
    # puts a
  end

  def best_stocks_kpis
    unless @stocks_kpis
      latest_kpi_date = StockKpi.maximum(:date)
      @stock_kpis = StockKpi
                      .joins(:stock)
                      .where(date: latest_kpi_date)
                      .idiv
                      .where('dy >= 3')
                      # .where('ddpy >= 2')
                      # .where('stocks.subsector != ?', "Construção Civil")
                      # .where(stock: { code:  })
                      .where('stocks.code IN (?)', CDV_LIST)
                      # .where('stocks.code NOT IN (?)', STOCK_BLACKLIST)
    end

    @stock_kpis
  end

  def order_without_repetition(order, title)
    stock_code_map = {}
    stock_count = 0

    best_stocks_kpis.order(order).each do |stock_kpi|
      normalized_code = stock_kpi.code.gsub(/\d+/, '')

      unless stock_code_map[normalized_code]
        stock_code_map[normalized_code] = stock_kpi
        stock_count += 1
      end

      if stock_count > 19
        break
      end
    end

    puts title
    tp stock_code_map.values, 'stock.code', :ev_to_ebit, :opdy, :ev_to_ebit_deviation, :opdy_deviation, :crazy_metric, 'stock.status_invest_url' => { width: 124312412 }

  end
end
