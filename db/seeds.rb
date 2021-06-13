user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

%w[
  BPAC11
  BRCR11
  BRDT3
  CSAN3
  DEVA11
  GNDI3
  HGCR11
  HGRE11
  KLBN11
  MGLU3
  SUZB3
  TGAR11
  WEGE3
  ].each do |stock_code|
  risk = Stock.risks.keys.sample
  stock = Stock.where(code: stock_code).first_or_create
  stock.update(risk: risk)

  UserStock.where(stock: stock, user: user).first_or_create
end
