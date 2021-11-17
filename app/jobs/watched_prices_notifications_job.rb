class Message
  attr_reader :id, :text

  def initialize(id, text)
    @id = id
    @text = text
  end
end

class BuyAtPrice
  attr_reader :stock_code, :current_price

  def initialize(stock_code:, target_price:, last_status: nil, last_price: nil)
    @stock_code = stock_code
    @target_price = target_price.to_f
    @last_status = last_status
    @last_price = last_price
  end

  def message(prices)
    @current_price = prices['currentPrice'].to_f

    return nil if current_price.zero?

    if current_price <= @target_price
      @status = 'target'
      return nil if @last_status == 'target'

      return "#{@stock_code} no alvo: #{'%.2f' % @target_price} (#{'%.2f' % current_price})"
    end

    if @current_price <= (@target_price * 1.01)
      @status = 'close_to_target'

      return nil if @last_status == 'close_to_target' && current_price >= @last_price

      return "#{@stock_code}. Em zona de compra: #{'%.2f' % current_price}, alvo: #{'%.2f' % @target_price}"
    end
  end

  def description
    "#{@stock_code} --- #{'%.2f' % @target_price}"
  end

  def id
    "#{@stock_code}-#{@target_price}"
  end

  def attributes
    {
      stock_code: @stock_code,
      target_price: @target_price,
      last_status: @status,
      last_price: @current_price
    }
  end
end

class Alerts
  def initialize(alerts_attributes)
    @by_code = {}
    @by_id = {}

    alerts_attributes.each do |alert_attributes|
      alert = BuyAtPrice.new( ** alert_attributes.deep_symbolize_keys)
      add alert
    end
  end

  def add(alert)
    return if @by_id[alert.id]

    @by_code[alert.stock_code] ||= []
    @by_code[alert.stock_code].push alert
    @by_id[alert.id] = alert
  end

  def by_code(code)
    @by_code[code]
  end

  def serialize
    @by_id.values.map(&:attributes).to_json
  end
end

class WatchedPricesNotificationsJob < ApplicationJob
  sidekiq_options retry: false

  def alerts
    unless @alerts
      alerts_attributes = begin
                            JSON.parse(redis.get("WATCHED_PRICES_ALERTS_ATTRIBUTES"))
                          rescue
                            []
                          end

      @alerts = Alerts.new alerts_attributes

      File.read(Rails.root.join('alerts.csv').to_s).split("\n").each do |line|
        stock_code, type, target_price = line.split ';'

        @alerts.add BuyAtPrice.new stock_code: stock_code, target_price: target_price
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
    # Track stocks "in the buying zone".
    # ITSA4 Just entered buying zone at 10.05.
    # TAEE11 Just left buying zone at 35.84.
    # CSAN3 Is still in the buying zone at 20.28: "Current position compared to the last 5 prices".

    # TODO:
    # ENBR3 Just signaled top of channel reversal.
    redis.del "LUNA_ALERT_MESSAGES"

    new_messages = []

    price_updates.each do |stock_code, prices|
      stock_alerts = alerts.by_code stock_code

      next unless stock_alerts

      stock_alerts.each do |alert|
        message = alert.message prices
        new_messages.push(message) if message
      end
    end

    final_message = new_messages.join("\n")
    redis.set "WATCHED_PRICES_ALERTS_ATTRIBUTES", alerts.serialize

    luna.message final_message unless final_message.blank?
    ensure_good_morning
  end
end
