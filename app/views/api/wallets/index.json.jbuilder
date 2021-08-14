json.wallets do
  json.array! @wallets do |wallet|
    json.partial! "member", wallet: wallet
  end
end
