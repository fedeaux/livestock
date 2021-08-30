class Analytics::IlpKpiStocks
  def initialize
    ActiveRecord::Base.logger = nil
  end

  def filtered_kpis
    unless @filtered_kpis
      most_recent_kpi_date = StockKpi.maximum(:date)

      # roe >= :roe AND
      # roa >= :roa AND
      # roic >= :roic AND
      # cagr_r >= :cagr_r AND
      # cagr_e >= :cagr_e AND
      # bvps >= :bvps AND
      # AND
      # p_to_ev >= :p_to_ev AND
      # p_to_ebit >= :p_to_ebit AND
      # ev_to_ebit >= :ev_to_ebit AND
      # nd_to_ebit >= :nd_to_ebit AND
      # nd_to_ev >= :nd_to_ev AND
      # psr >= :psr AND
      # eps >= :eps

      query = "adl >= :adl AND
               opdy >= :opdy AND
               p_to_e >= :p_to_e"

      @filtered_kpis = StockKpi.joins(:stock).where(
        date: most_recent_kpi_date,
      ).where(query, {
                adl: 200000,
                opdy: 3,
                p_to_e: 0,
                # p_to_ev: 0,
                # p_to_ebit: 0,
                # ev_to_ebit: 0,
                # nd_to_ebit: 0,
                # nd_to_ev: 0,
                # psr: 0,
                # roe: 0,
                # roa: 0,
                # roic: 0,
                # cagr_r: 0,
                # cagr_e: 0,
                # bvps: 0,
                # eps: 0
              }
             ).where(
        "stocks.subsector != 'Construção Civil' AND stocks.segment != 'Carnes e Derivados'"
      )
    end

    # p_to_e: { pt_br: 'P/L', weight: 0 },
    # p_to_ev: { pt_br: 'P/VP', weight: 0 },
    # p_to_ebit: { pt_br: 'P/EBIT', weight: 0 },
    # ev_to_ebit: { pt_br: 'EV/EBIT', weight: 0 },
    # nd_to_ebit: { pt_br: 'DIVIDA LIQUIDA / EBIT', weight: 0 },
    # nd_to_ev: { pt_br: 'DIVIDA LIQUIDA / PATRI.', weight: 0 },
    # psr: { pt_br: 'PSR', weight: 0 },
    # roe: { pt_br: 'ROE', weight: 0 },
    # roa: { pt_br: 'ROA', weight: 0 },
    # roic: { pt_br: 'ROIC', weight: 0 },
    # cagr_r: { pt_br: 'CAGR RECEITAS 5 ANOS', weight: 0 },
    # cagr_e: { pt_br: 'CAGR LUCROS 5 ANOS', weight: 0 },
    # adl: { pt_br: 'LIQUIDEZ MEDIA DIARIA', weight: 0 },
    # bvps: { pt_br: 'VPA', name: 'Book value per share', weight: 0 },
    # eps: { pt_br: 'LPA', name: 'Earnings per share', weight: 0 },
    @filtered_kpis
  end

  def query_template
    queryable_kpis = %w[
      p_to_e
      p_to_ev
      p_to_ebit
      ev_to_ebit
      nd_to_ebit
      nd_to_ev
      psr
      roe
      roa
      roic
      cagr_r
      cagr_e
      bvps
      eps
    ]

    puts (queryable_kpis.map do |kpi|
            "#{kpi} >= :#{kpi}"
    end.join " AND\n")

    puts (queryable_kpis.map do |kpi|
            "#{kpi}: 0"
    end.join ",\n")
  end

  def calculate
    n = filtered_kpis.count.to_f

    weighted_kpis.each do |weighted_kpi|
      weighted_kpi.average = filtered_kpis.average(weighted_kpi.key)
    end

    weighted_kpis.each do |weighted_kpi|
      variance = filtered_kpis.map do |kpi|
        (kpi.send(weighted_kpi.key) - weighted_kpi.average) ** 2
      end.sum / n

      weighted_kpi.sd = Math.sqrt(variance)
      weighted_kpi.sign_correction = weighted_kpi.weight / weighted_kpi.weight.abs
    end

    # tp weighted_kpis, :key, :average, :sd

    (4...20).each do |selection_count|
      calculate_to_count(selection_count)
    end
  end

  def calculate_to_count(selection_count)
    # tp filtered_kpis
    # tp filtered_kpis, :code, :p_to_e, :p_to_ev, :adl
    # tp weighted_kpis, :key, :weight

    m = Cbc::Model.new

    prefix_vars = {}
    sector_vars = {}

    ilp_stocks = filtered_kpis.map do |kpi|
      prefix = kpi.code.gsub(/\d/, '')
      next if %w[PCAR TRPL CPLE TAEE].include? prefix

      selected_var = m.int_var(0..1, name: kpi.code)
      prefix_vars[prefix] ||= []
      prefix_vars[prefix].push(selected_var)
      sector_vars[kpi.stock.sector] ||= []
      sector_vars[kpi.stock.sector].push(selected_var)

      ilp_stock_h = {
        code: kpi.code,
        selected_var: selected_var,
        sector: kpi.stock.sector,
        opdy: kpi.opdy.to_f,
        ev_to_ebit: kpi.ev_to_ebit.to_f,
        url: kpi.stock.status_invest_url,
      }

      weighted_kpis.each do |weighted_kpi|
        sd_ratio = kpi.deviation(weighted_kpi.key, weighted_kpi.sd, weighted_kpi.average)
        ilp_stock_h[weighted_kpi.key] = kpi.send(weighted_kpi.key).to_f
        ilp_stock_h["#{weighted_kpi.key}_sd_r".to_sym] = sd_ratio
        ilp_stock_h["#{weighted_kpi.key}_weight".to_sym] = (weighted_kpi.weight * sd_ratio * weighted_kpi.sign_correction).to_f
      end

      OpenStruct.new(ilp_stock_h)
    end.compact

    # weighted_kpis.each do |weighted_kpi|
    #   puts "#{weighted_kpi.key}"

    #   ilp_stocks.first(5).each do |ilp_stock|
    #     ilp_stock[weighted_kpi.key]
    #   end
    # end

    # tp weighted_kpis, :key, :average, :sd, :weight
    # puts ''
    # tp ilp_stocks.first(5), :code, :ev_to_ebit, :ev_to_ebit_sd_r, :ev_to_ebit_weight, :spc, :roic, :roic_sd_r, :roic_weight

    # return

    m.minimize(
      ilp_stocks.map do |ilp_stock|
        # puts "ilp_stock: #{ilp_stock.code}"
        weighted_kpis.map do |weighted_kpi|
          # v = ilp_stock.send("#{weighted_kpi.key}_sd_r")
          # puts "#{weighted_kpi.key}: #{weighted_kpi.weight}, #{v}, #{v * weighted_kpi.weight}"
          ilp_stock.selected_var * ilp_stock.send("#{weighted_kpi.key}_weight")
        end.reduce(&:+)
      end.reduce(&:+)
    )

    m.enforce(
      ilp_stocks.map do |ilp_stock|
        ilp_stock.selected_var * ilp_stock.opdy
      end.reduce(&:+) >= 6 * selection_count
    )

    m.enforce(
      ilp_stocks.map do |ilp_stock|
        ilp_stock.selected_var
      end.reduce(&:+) == selection_count
    )

    prefix_vars.values.each do |vars|
      m.enforce(
        vars.reduce(&:+) <= 1
      )
    end

    sector_vars.values.each do |vars|
      m.enforce(
        vars.reduce(&:+) <= 2
      )
    end

    p = m.to_problem

    p.solve

    unless p.proven_infeasible?
      puts "Selection count: #{selection_count}"
      selected_ilp_stocks = ilp_stocks.select do |ilp_stock|
        p.value_of(ilp_stock.selected_var) > 0
      end.sort_by(&:code).sort_by(&:sector)

      tp selected_ilp_stocks, :code, :opdy, :sector, :ev_to_ebit, url: { width: 400 }

      #                         .each do |ilp_stock|
      #   puts "#{ilp_stock.code}: #{ilp_stock.opdy} #{ilp_stock.sector} #{ilp_stock.ev_to_ebit} #{ilp_stock.url}"
      # end
    end

    # tp weighted_kpis, :key, :average, :sd
    # tp filtered_kpis.order(:opdy), :opdy
  end

  def weighted_kpis
    @weighted_kpis ||= KPIS.values.reject do |kpi|
      kpi.weight.blank? || kpi.weight.zero?
    end
  end

  KPIS = {
    opdy: { pt_br: 'Dividendos sem zuera', weight: 2 },
    p_to_e: { pt_br: 'P/L', weight: -1 },
    p_to_ev: { pt_br: 'P/VP', weight: -1 },
    p_to_ebit: { pt_br: 'P/EBIT', weight: 0 },
    ev_to_ebit: { pt_br: 'EV/EBIT', weight: -3 },
    nd_to_ebit: { pt_br: 'DIVIDA LIQUIDA / EBIT', weight: -1 },
    nd_to_ev: { pt_br: 'DIVIDA LIQUIDA / PATRI.', weight: -1 },
    psr: { pt_br: 'PSR', weight: -1 },
    roe: { pt_br: 'ROE', weight: 1 },
    roa: { pt_br: 'ROA', weight: 1 },
    roic: { pt_br: 'ROIC', weight: 1 },
    cagr_r: { pt_br: 'CAGR RECEITAS 5 ANOS', weight: 1 },
    cagr_e: { pt_br: 'CAGR LUCROS 5 ANOS', weight: 1 },
    adl: { pt_br: 'LIQUIDEZ MEDIA DIARIA', weight: 0 },
    bvps: { pt_br: 'VPA', name: 'Book value per share', weight: 0 },
    eps: { pt_br: 'LPA', name: 'Earnings per share', weight: 0 },
  }.to_a.select do |pair|
    !pair.first.to_s.starts_with? 'key'
  end.map do |pair|
    attributes = pair.second
    attributes[:key] = pair.first
    [pair.first, Analytics::Kpi.new(attributes)]
  end.to_h
end
