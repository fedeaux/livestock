class Integrations::ClearController < ApplicationController
  skip_forgery_protection

  def injector
    js = File.read(
      Rails.root.join('app/javascript/integrations/clear/injected.js')
    ).gsub 'ENV_API_HOST', ENV['API_HOST']

    render json: { js: js }
  end

  def operations
    ActiveRecord::Base.logger = nil

    params[:operations].permit!.to_h.values.each do |operation_params|
      stock = Stock.c(operation_params[:code].gsub(/F$/, ''))

      next unless stock

      user_stock = UserStock.where(stock: stock, user: user).first_or_create

      # PQP
      date_string = operation_params[:date]
               .gsub(' Jan ', '/01/')
               .gsub(' Fev ', '/02/')
               .gsub(' Mar ', '/03/')
               .gsub(' Abr ', '/04/')
               .gsub(' May ', '/05/')
               .gsub(' Jun ', '/06/')
               .gsub(' Jul ', '/07/')
               .gsub(' Ago ', '/08/')
               .gsub(' Set ', '/09/')
               .gsub(' Out ', '/10/')
               .gsub(' Nov ', '/11/')
               .gsub(' Dez ', '/12/')

      date = Date.strptime(date_string&.strip, "%d/%m/%Y")

      count_string = operation_params[:count]
      parsed_count = count_string.gsub(/[^\d\.\,\-]/, "")&.gsub(".", '')&.gsub(",", '.')&.strip.to_f

      if count_string.include? 'M'
        parsed_count *= 1000000
      elsif count_string.include? 'K'
        parsed_count *= 1000
      end

      stock_price = operation_params[:price].gsub('R$', '').gsub(',', '.').strip.to_f

      user_stock_operation_attributes = {
        executed_at: date,
        nature: operation_params[:nature],
        stock_count: parsed_count,
        stock_price: stock_price
      }

      user_stock.user_stock_operations.where(
        user_stock_operation_attributes
      ).first_or_create
    end
  end

  def prices
    ActionCable.server.broadcast "Notifications",
                                 {
                                   type: 'ClearIntegration#prices',
                                   data: params.permit![:priceUpdates].to_h
                                 }

    head :ok
  end

  def user
    User.find_by(email: 'phec06@gmail.com')
  end
end
