json.wallet do
  json.partial! "member", wallet: @wallet
end

json.cache_key @wallet.cache_key(@query)
