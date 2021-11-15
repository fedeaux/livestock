require 'telegram/bot'

class Integrations::Luna
  CHAT_ID = 755609672

  def message(text = 'Oi Oi :)')
    client.api.send_message chat_id: CHAT_ID, text: text
  end

  def client
    @client ||= Telegram::Bot::Client.new ENV['LUNA_API_TOKEN']
  end
end
