
User.first.stocks.map(&:link)
# SELECT "stocks".* FROM "stocks" INNER JOIN "user_stocks" ON "stocks"."id" = "user_stocks"."stock_id" WHERE "user_stocks"."user_id" = $1  [["user_id", 1]]

Stock.first.low_risk? # true of false
Stock.risks
# {"none"=>0, "low"=>10, "moderate"=>20, "high"=>30, "incredible"=>40}

# https://www.marketwatch.com/investing/stock/BPAC11
# https://www.marketwatch.com/investing/stock/BRCR11
# https://www.marketwatch.com/investing/stock/BRDT3
# https://www.marketwatch.com/investing/stock/CSAN3
# https://www.marketwatch.com/investing/stock/DEVA11
# https://www.marketwatch.com/investing/stock/GNDI3
# https://www.marketwatch.com/investing/stock/HGCR11
# https://www.marketwatch.com/investing/stock/HGRE11
# https://www.marketwatch.com/investing/stock/KLBN11
# https://www.marketwatch.com/investing/stock/MGLU3
# https://www.marketwatch.com/investing/stock/SUZB3
# https://www.marketwatch.com/investing/stock/TGAR11
# https://www.marketwatch.com/investing/stock/WEGE3






["https://www.fundsexplorer.com.br/funds/BPAC11",
"https://www.fundsexplorer.com.br/funds/BRCR11",
"https://www.fundsexplorer.com.br/funds/BRDT3",
"https://www.fundsexplorer.com.br/funds/CSAN3",
"https://www.fundsexplorer.com.br/funds/DEVA11",
"https://www.fundsexplorer.com.br/funds/GNDI3",
"https://www.fundsexplorer.com.br/funds/HGCR11",
"https://www.fundsexplorer.com.br/funds/HGRE11",
"https://www.fundsexplorer.com.br/funds/KLBN11",
"https://www.fundsexplorer.com.br/funds/MGLU3",
"https://www.fundsexplorer.com.br/funds/SUZB3",
"https://www.fundsexplorer.com.br/funds/TGAR11",
"https://www.fundsexplorer.com.br/funds/WEGE3"]
