class Integrations::ClearController < ApplicationController
  skip_forgery_protection

  def injector
    js = File.read(
      Rails.root.join('app/javascript/integrations/clear/injected.js')
    ).gsub 'ENV_API_HOST', ENV['API_HOST']

    render json: { js: js }
  end

  def prices
    ap params
    # TODO: Cable update

    head :ok
  end
end
