class Integrations::StatusInvestController < ApplicationController
  skip_forgery_protection

  def injector
    js = File.read(
      Rails.root.join('app/javascript/integrations/status_invest/injector.js')
    ).gsub 'ENV_API_HOST', ENV['API_HOST']

    render json: { js: js }
  end

  def operations
    ActiveRecord::Base.logger = nil

    params[:operations].values.each do |operation|
      stock = Stock.cOrTryToCreate(operation[:code])

      unless stock
        puts "No stock #{operation[:code]}"
        next
      end

      user_stock = UserStock.where(stock: stock, user: user).first_or_create

      user_stock.user_stock_operations.where(
        operation.except(:code)
      ).first_or_create
    end

    UserStocks::ConsolidateOperations.new(user: user).do
    UserStocks::ConsolidateWallets.new(user: user).do
  end

  def stocks
    ActiveRecord::Base.logger = nil

    params[:stocks].values.each do |stock_attributes|
      Stock.ensure(stock_attributes[:code], stock_attributes)
    end

    UserStocks::ConsolidateOperations.new(user: user).do
    UserStocks::ConsolidateWallets.new(user: user).do
  end

  def user
    User.find_by(email: 'phec06@gmail.com')
  end
end
