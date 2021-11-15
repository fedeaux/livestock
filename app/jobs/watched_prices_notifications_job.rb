class BuyAtPrice
  def initialize(stock_code, target_price)
    @stock_code = stock_code
    @target_price = target_price.to_f
  end

  def message(prices)
    current_price = prices['currentPrice'].to_f

    if current_price <= @target_price
      return "#{@stock_code} caiu pra #{'%.2f' % @target_price}!"
    end

    if current_price <= (@target_price * 1.02)
      return "Fique de olho em #{@stock_code}, #{'%.2f' % current_price} tá quase #{'%.2f' % @target_price}"
    end
  end

  def description
    "#{@stock_code} --- #{'%.2f' % @target_price}"
  end
end

class WatchedPricesNotificationsJob < ApplicationJob
  sidekiq_options retry: false

  def alerts
    unless @alerts
      @alerts = {}

      File.read(Rails.root.join('alerts.csv').to_s).split("\n").each do |line|
        code, type, target_price = line.split ';'

        @alerts[code] ||= []
        @alerts[code].push BuyAtPrice.new code, target_price
      end
    end

    @alerts
  end

  def redis
    @redis ||= Redis.new
  end

  def luna
    @luna ||= Integrations::Luna.new
  end

  def good_morning_message
    [
      "Oi oi, bom dia! Tudo bem? :)",
      "",
      "To aqui de olho na bolsa e te aviso se aparecer alguma coisa legal",
      ""
    ].concat(alerts.values.flatten.map(&:description)).join("\n")
  end

  def ensure_good_morning
    last_good_morning = redis.get "LUNA_GOOD_MORNING_MESSAGES"

    if !last_good_morning || Time.parse(last_good_morning) < Time.now.beginning_of_day
      redis.set "LUNA_GOOD_MORNING_MESSAGES", Time.now.to_s
      luna.message good_morning_message
    end
  end

  def perform(price_updates)
    luna_messages = begin
                      JSON.parse(redis.get("LUNA_ALERT_MESSAGES") || '{}').map do |message, at|
                        [message, Time.parse(at)]
                      end.to_h
                    rescue
                      {}
                    end

    new_messages = []

    price_updates.each do |stock_code, prices|
      stock_alerts = alerts[stock_code]

      next unless stock_alerts

      stock_alerts.each do |alert|
        message = alert.message prices
        new_messages.push(message) if message
      end
    end

    to_be_sent = []

    new_messages.each do |message|
      if !luna_messages[message] || luna_messages[message] < 5.minutes.ago
        to_be_sent.push message
        luna_messages[message] = Time.now.to_s
      end
    end

    final_message = to_be_sent.join("\n")
    redis.set "LUNA_ALERT_MESSAGES", luna_messages.to_json

    luna.message final_message unless final_message.blank?
    ensure_good_morning
  end
end
