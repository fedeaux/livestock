class Maintenance::DailyJob < ApplicationJob
  def perform
    Seeders::Daily.new.seed
  end
end
