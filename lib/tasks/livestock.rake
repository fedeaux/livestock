task release: :environment do
end

task daily_job: :environment do
  Maintenance::DailyJob.perform_async
end
