class B3CrappyFileExtractor
  attr_reader :stocks

  def initialize
    @stocks = {}
  end

  def read(line)
    data = extract_line(line)

    return unless data[:type] == "01"

    @stocks[data[:symbol]] ||= { lines: [], dates: {} }
    @stocks[data[:symbol]][:lines] << line
    @stocks[data[:symbol]][:dates][data[:date]] = data
  end

  def extract_line(line)
    {
      type: line[0..1],
      date: line[2..9],
      symbol: line[12..20].strip,
      price_avg: line[95..107].to_f/100,
      price_last: line[108..120].to_f/100
    }
  end

  def symbols
    @stocks.keys
  end
end

e = B3CrappyFileExtractor.new

File.readlines("./COTAHIST_A2021.TXT")[1..-1].each do |l|
  e.read l
end

# File.open("./symbols", "w") do |f|
#   f.write e.symbols.join "\n"
# end

File.open("./bpac11", "w") do |f|
  f.write e.stocks["BPAC11"][:dates].values.map { |v| "#{v[:date]}: #{v[:price_last]}" }.join "\n"
end
