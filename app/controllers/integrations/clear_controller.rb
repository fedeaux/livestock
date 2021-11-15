class Integrations::ClearController < ApplicationController
  skip_forgery_protection

  def injector
    js = File.read(
      Rails.root.join('app/javascript/integrations/clear/injector.js')
    ).gsub 'ENV_API_HOST', ENV['API_HOST']

    render json: { js: js }
  end

  def prices
    price_updates = params.permit![:priceUpdates].to_h

    ActionCable.server.broadcast "Notifications",
                                 {
                                   type: 'ClearIntegration#prices',
                                   data: price_updates
                                 }

    WatchedPricesNotificationsJob.perform_async price_updates

    head :ok
  end
end
