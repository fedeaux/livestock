user = User.where(id: 1).first_or_create
user.update(email: 'phec06@gmail.com', name: 'Pedro')

# Seeders::StockKpis.new.seed
# Seeders::StockEarnings.new.seed
# https://statusinvest.com.br/cliente/comparar-acoes/b3sa3,bbas3,bbse3,brap3,cmig4,cple6,csan3,csmg3,even3,enbr3

# Compra Forte:
# CMIG4
# ENBR3
# BBSE3
# KLBN11
# TIMS3
# GOAU4
# WIZS3
# VBBR3

# RAPT4

# Compra:
# B3SA3
# BBAS3
# BRAP3
# CPLE6
# CSAN3
# CSMG3
# EVEN3
# VIVT3

# Aguardar
# ROMI3
# SAPR11
# TRPL4

# Vender
# TAEE11

# Não sei
# GRND3
# UNIP6
# VIIA3

# Estou comprando:
# KLBN11 => KLBN4
# GOAU4 => GOAU3

Seeders::Daily.new.seed
