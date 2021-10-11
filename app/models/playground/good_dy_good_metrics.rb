class PGStock < OpenStruct
end

class Playground::GoodDyGoodMetrics
  def initialize
  end

  def do
    read_csv
  end

  def map_cols
    puts "ae"
    i = 0
    File.read("#{__dir__}/good_dy_good_metrics.csv").split("\n").first.split(";").map(&:strip).each do |col|
      puts "key_#{i}: { name: '#{col}', i: #{i} },"
      i += 1
    end
  end

  def read_csv
    pgstocks = File.read("#{__dir__}/good_dy_good_metrics.csv").split("\n")[1..-1].map do |row|
      cols = row.split(';').map(&:strip)
      attributes = {}

      cols_to_consider.each do |metric_name|
        col_props = COLS_MAP[metric_name]

        attributes[metric_name] = if col_props[:type] == :string
                                 cols[col_props[:i]]
                               else
                                 cols[col_props[:i]].gsub(',', '.').to_f
                               end
      end

      PGStock.new attributes
    end

    totals = OpenStruct.new

    metrics_to_analize.each do |metric_name|
      totals.send("total_#{metric_name}=", pgstocks.map do |ps|
        ps.send metric_name
      end.sum)

      totals.send("mean_#{metric_name}=", totals.send("total_#{metric_name}") / pgstocks.count)

      totals.send("#{metric_name}_sd=", pgstocks.map do |ps|
                    (ps.send(metric_name) - totals.send("mean_#{metric_name}")).abs
                  end.sum / pgstocks.count)

    end

    puts (cols_to_consider.map do |metric_name|
            col_props = COLS_MAP[metric_name]
            ' %-15s' % "#{metric_name} #{col_props[:good]}"
          end.join "|")

    puts (cols_to_consider.map do |metric_name|
            ' %-15.10s' % totals.send("mean_#{metric_name}")
          end.join "|")

    puts (cols_to_consider.map do |metric_name|
            ' %-15.10s' % totals.send("#{metric_name}_sd")
          end.join "|")

    pgstocks.each do |ps|
      ps.score = 0.0

      metrics_to_analize.each do |metric_name|
        col_props = COLS_MAP[metric_name]
        value = ps.send metric_name
        mean = totals.send("mean_#{metric_name}")
        sd = totals.send("#{metric_name}_sd")
        weight = col_props[:weight] || 2
        abs_score = (value - mean)/sd * weight

        if col_props[:good] == '-'
          ps.send("#{metric_name}_score=", - abs_score)
        else
          ps.send("#{metric_name}_score=", abs_score)
        end

        ps.score += ps.send("#{metric_name}_score")
      end

      ps.sqrt_score = ps.score > 0 ? Math.sqrt(ps.score) : 0
    end

    good_stocks = pgstocks.select do |ps|
      ps.score > 0
    end.sort_by(&:score).reverse

    selected_stocks = {}

    good_stocks.each do |gs|
      prefix = gs.code.gsub /\d+/, ''
      next if selected_stocks[prefix]
      selected_stocks[prefix] = gs
    end

    selected_stocks = selected_stocks.values.reject do |ps|
      # blacklist
      [].include? ps.code
    end.first(8)

    total_sqrt_scores = selected_stocks.map(&:sqrt_score).sum
    to_invest = 60000

    selected_stocks.each do |ps|
      ps.partic = ((ps.sqrt_score * 10000.0) / total_sqrt_scores).to_i / 100.0
      ps.to_invest = ps.partic * to_invest / 100

      # puts ([cols_to_consider, :score, :sqrt_score, :partic].flatten.map do |col_name|
      #         score = ps.send("#{col_name}_score")
      #         "#{ps.send(col_name)} (#{score})".ljust(16, ' ').first(16)
      #       end.join '|')
    end

    total_to_invest = 0

    rows = selected_stocks.map do |ps|
      stock_count = ps.to_invest / ps.price
      batch_stock_count = (stock_count / 100.0).round * 100
      actual_amount = (batch_stock_count * ps.price * 100).to_i / 100.0

      total_to_invest += actual_amount
      [
        "#{batch_stock_count} x #{ps.price}",
        "#{actual_amount}",
        "at",
        "#{ps.code}",
        "(#{ps.partic}%)",
        "(dy: #{ps.dy})",
        "https://statusinvest.com.br/acoes/#{ps.code}"
      ]
    end

    col_lenghts = []

    rows.each do |row|
      row.each_with_index do |col, index|
        col_lenghts[index] = col.length if !col_lenghts[index] || col_lenghts[index] < col.length
      end
    end

    rows.each do |row|
      str = row.each_with_index.map do |col, index|
        col.ljust(col_lenghts[index] + 2, ' ')
      end.join

      puts str
    end

    puts "TOTAL: R$#{total_to_invest}"

    nil
  end

  def cols_to_consider
    COLS_MAP.to_a.select do |pair|
      !pair.first.to_s.starts_with?('key')
    end.map(&:first)
  end

  def metrics_to_analize
    COLS_MAP.to_a.select do |pair|
      !pair[1][:type] && !pair.first.to_s.starts_with?('key') && pair[1][:good]
    end.map(&:first)
  end

  COLS_MAP = {
    code: { name: 'TICKER', i: 0, type: :string },
    price: { name: 'PRECO', i: 1 },
    dy: { name: 'DY', i: 2, good: '+' },
    p_l: { name: 'P/L', i: 3, good: '-' },
    p_vp: { name: 'P/VP', i: 4, good: '-' },
    key_5: { name: 'P/ATIVOS', i: 5 },
    key_6: { name: 'MARGEM BRUTA', i: 6 },
    key_7: { name: 'MARGEM EBIT', i: 7, good: '+' },
    key_8: { name: 'MARG. LIQUIDA', i: 8 },
    p_ebit: { name: 'P/EBIT', i: 9, good: '-', weight: 3 },
    key_10: { name: 'EV/EBIT', i: 10 },
    div_liq_ebit: { name: 'DIVIDA LIQUIDA / EBIT', i: 11, good: '-' },
    div_liq_patri: { name: 'DIV. LIQ. / PATRI.', i: 12, good: '-' },
    psr: { name: 'PSR', i: 13, good: '-' },
    key_14: { name: 'P/CAP. GIRO', i: 14 },
    key_15: { name: 'P. AT CIR. LIQ.', i: 15 },
    key_16: { name: 'LIQ. CORRENTE', i: 16 },
    roe: { name: 'ROE', i: 17, good: '+' },
    roa: { name: 'ROA', i: 18, good: '+'  },
    roic: { name: 'ROIC', i: 19, good: '+' },
    key_20: { name: 'PATRIMONIO / ATIVOS', i: 20 },
    key_21: { name: 'PASSIVOS / ATIVOS', i: 21 },
    key_22: { name: 'GIRO ATIVOS', i: 22 },
    key_23: { name: 'CAGR RECEITAS 5 ANOS', i: 23 },
    key_24: { name: 'CAGR LUCROS 5 ANOS', i: 24 },
    key_25: { name: 'LIQUIDEZ MEDIA DIARIA', i: 25 },
    vpa: { name: 'VPA', i: 26, good: '+' },
    lpa: { name: 'LPA', i: 27, good: '+' },
    key_28: { name: 'PEG Ratio', i: 28 },
    key_29: { name: 'VALOR DE MERCADO', i: 29 }
  }
end
