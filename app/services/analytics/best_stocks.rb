class Analytics::BestStocks
  STOCK_BLACKLIST = %w[JBSS3 BRSR6]

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
    stocks.sort_by!(&:ev_to_ebit)
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
    tp stock_code_map.values, :'stock.code', :ev_to_ebit, :opdy, :'stock.sector', :'stock.subsector', :'stock.segment', 'stock.status_invest_url' => { width: 124312412 }

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
                      .where('ev_to_ebit > 0')
                      .where('adl > 200000')
                      .where('opdy >= 6')
                      # .where('ddpy >= 2')
                      .where('stocks.subsector != ?', "Construção Civil")
                      .where('stocks.code NOT IN (?)', STOCK_BLACKLIST)
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

    # n = stocks_kpis.count
    # average_ev_to_ebit = stocks_kpis.average(:ev_to_ebit)
    # variance = stocks_kpis.pluck(:ev_to_ebit).map do |v|
    #   (v - average_ev_to_ebit) ** 2
    # end.sum / n

    # standard_deviation = Math.sqrt(variance)

    # puts "average_ev_to_ebit: #{average_ev_to_ebit}"
    # puts "standard_deviation: #{standard_deviation}"
    # puts "#{stocks_kpis.maximum(:ev_to_ebit)} #{stocks_kpis.minimum(:ev_to_ebit)}"
    # puts "ev_to_ebit_sd: #{ev_to_ebit_sd}"
    # stocks_kpis.where("ev_to_ebit < #{average_ev_to_ebit}")

    # stock_code_map = {}
    # stock_count = 0

    # puts "TOTAL: #{best_stocks_kpis.count}"

    # best_stocks_kpis.order("ev_to_ebit ASC").each do |stock_kpi|
    #   normalized_code = stock_kpi.code.gsub(/\d+/, '')

    #   unless stock_code_map[normalized_code]
    #     stock_code_map[normalized_code] = stock_kpi
    #     stock_count += 1
    #   end

    #   # if stock_count > 19
    #   #   break
    #   # end
    # end

    # puts "By ev_to_ebit"
    # tp stock_code_map.values, 'stock.code', :ev_to_ebit, :opdy, 'stock.status_invest_url' => { width: 124312412 }

    # stock_code_map = {}
    # stock_count = 0

    # best_stocks_kpis.order("opdy DESC").each do |stock_kpi|
    #   normalized_code = stock_kpi.code.gsub(/\d+/, '')

    #   unless stock_code_map[normalized_code]
    #     stock_code_map[normalized_code] = stock_kpi
    #     stock_count += 1
    #   end

    #   if stock_count > 19
    #     break
    #   end
    # end
