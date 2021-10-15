json.wallets do
  json.array! @wallets do |wallet|
    json.partial! "member", wallet: wallet

    json.user_stocks do
      json.array! wallet.user_stocks do |user_stock|
        json.partial! "/api/user_stocks/attributes", user_stock: user_stock
      end
    end
  end
end

json.cache_key Wallet.cache_key
