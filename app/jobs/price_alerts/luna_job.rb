class PriceAlerts::LunaJob < ApplicationJob
  sidekiq_options retry: false

  STATE_REDIS_KEY = "PRICE_ALERTS_LUNA_JOB_STATE".freeze

  def resolve_state
    resolved_state = begin
                       JSON.parse redis.get(STATE_REDIS_KEY) || '{}'
                     rescue
                       {}
                     end.deep_symbolize_keys

    resolved_state[:timestamp] = resolved_state[:timestamp] ? Time.parse(resolved_state[:timestamp]) : nil

    return resolved_state if resolved_state[:timestamp] && resolved_state[:timestamp] > Time.now.beginning_of_day

    {
      stock_price_alerts_attributes: JSON.parse(File.read(Rails.root.join("tmp/stock_price_alerts_attributes.json").to_s)),
      published_good_morning: false,
      timestamp: Time.now
    }
  end

  def state
    @state ||= resolve_state
  end

  def alerts
    @alerts ||= state[:stock_price_alerts_attributes].map do |stock_price_alert_attributes|
      StockPriceAlert.new(** stock_price_alert_attributes.deep_symbolize_keys)
    end
  end

  def redis
    @redis ||= Redis.new
  end

  def luna
    @luna ||= Integrations::Luna.new
  end

  def good_morning_message
    sells = alerts.map(&:sell_message).compact

    messages = [
      "Oi oi, bom dia! Tudo bem? :)",
      "",
      "Te aviso se aparecer umas parada boa",
      ""
    ].concat(alerts.map(&:description))

    if sells.any?
      messages = messages.concat(
        [
          "", "", "Ordens de venda para abrir"
        ].concat(sells)
      )
    end

    messages.join("\n")
  end

  def ensure_good_morning
    unless state[:published_good_morning]
      state[:published_good_morning] = true

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
    redis.del "WATCHED_PRICES_ALERTS_ATTRIBUTES"
    redis.del "LUNA_GOOD_MORNING_MESSAGES"
    # redis.del STATE_REDIS_KEY

    new_messages = []

    alerts.each do |alert|
      stock_price_update = price_updates[alert.stock_code]

      next unless stock_price_update

      message = alert.update stock_price_update
      new_messages.push(message) if message
    end

    final_message = new_messages.join("\n")

    ensure_good_morning
    luna.message final_message unless final_message.blank?

    state_to_be_saved = state.merge(
      stock_price_alerts_attributes: alerts.map(&:attributes)
    )

    redis.set STATE_REDIS_KEY, state_to_be_saved.to_json
  end
end
