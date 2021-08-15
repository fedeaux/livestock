class Kpi < OpenStruct
end

class Seeders::StockKpis < Seeders::BaseSeeder
  def initialize
    @month = '2021-08'
  end

  def seed
    File.read("app/services/seeders/data/status_invest/market/#{@month}.csv").split("\n")[1..-1].map do |line|
      cols = line.split(";")
      code = cols.first

      stock = Stock.find_by_id_or_code(code)

      unless stock
        sector = Sector.where(name: "Manual").first_or_create
        company = Company.where(name: code, sector: sector).first_or_create
        stock = Stock.where(code: code, company_id: company.id).first_or_create
      end

      attributes = {}

      storable_kpis.each do |kpi|
        attributes[kpi.key] = parse_money_string cols[kpi.i]
      end

      stock_kpi = stock.stock_kpis.where(date: parse_ym_string(@month)).first_or_create

      stock_kpi.update(attributes)
    end
  end

  def generate_stuff
    puts storable_kpis.map do |kpi|
      "#{kpi.key}:decimal"
    end.join ' '
  end

  def storable_kpis
    KPIS_CSV_MAP.values.select do |kpi|
      kpi.key != :code
    end
  end

  KPIS_CSV_MAP = {
    code: { pt_br: 'TICKER', i: 0, type: :string },
    price: { pt_br: 'PRECO', i: 1 },
    dy: { pt_br: 'DY', i: 2 },
    p_to_e: { pt_br: 'P/L', name: 'Price to earnigs', i: 3 },
    p_to_ev: { pt_br: 'P/VP', name: 'Price to enterprise value', i: 4 },
    key_5: { pt_br: 'P/ATIVOS', i: 5 },
    key_6: { pt_br: 'MARGEM BRUTA', i: 6 },
    key_7: { pt_br: 'MARGEM EBIT', i: 7 },
    key_8: { pt_br: 'MARG. LIQUIDA', i: 8 },
    p_to_ebit: { pt_br: 'P/EBIT', i: 9 },
    ev_to_ebit: { pt_br: 'EV/EBIT', i: 10, good: '-' },
    nd_to_ebit: { pt_br: 'DIVIDA LIQUIDA / EBIT', i: 11 },
    nd_to_ev: { pt_br: 'DIVIDA LIQUIDA / PATRI.', i: 12 },
    psr: { pt_br: 'PSR', i: 13 },
    key_14: { pt_br: 'P/CAP. GIRO', i: 14 },
    key_15: { pt_br: 'P. AT CIR. LIQ.', i: 15 },
    key_16: { pt_br: 'LIQ. CORRENTE', i: 16 },
    roe: { pt_br: 'ROE', i: 17 },
    roa: { pt_br: 'ROA', i: 18 },
    roic: { pt_br: 'ROIC', i: 19 },
    key_20: { pt_br: 'PATRIMONIO / ATIVOS', i: 20 },
    key_21: { pt_br: 'PASSIVOS / ATIVOS', i: 21 },
    key_22: { pt_br: 'GIRO ATIVOS', i: 22 },
    key_23: { pt_br: 'CAGR RECEITAS 5 ANOS', i: 23 },
    key_24: { pt_br: 'CAGR LUCROS 5 ANOS', i: 24 },
    key_25: { pt_br: 'LIQUIDEZ MEDIA DIARIA', i: 25 },
    bvps: { pt_br: 'VPA', name: 'Book value per share', i: 26 },
    eps: { pt_br: 'LPA', name: 'Earnings per share', i: 27 },
    key_28: { pt_br: 'PEG Ratio', i: 28 },
    key_29: { pt_br: 'VALOR DE MERCADO', i: 29 }
  }.to_a.select do |pair|
    !pair.first.to_s.starts_with? 'key'
  end.map do |pair|
    attributes = pair.second
    attributes[:type] ||= :float
    attributes[:key] = pair.first
    [pair.first, Kpi.new(attributes)]
  end.to_h
end
