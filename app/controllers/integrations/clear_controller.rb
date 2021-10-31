class Integrations::ClearController < ApplicationController
  skip_forgery_protection

  def injector
    js = File.read(
      Rails.root.join('app/javascript/integrations/clear/injector.js')
    ).gsub 'ENV_API_HOST', ENV['API_HOST']

    render json: { js: js }
  end

  def prices
    ActionCable.server.broadcast "Notifications",
                                 {
                                   type: 'ClearIntegration#prices',
                                   data: params.permit![:priceUpdates].to_h
                                 }

    head :ok
  end
end
