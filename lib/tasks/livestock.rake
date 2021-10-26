task release: :environment do
end

task daily_job: :environment do
  Maintenance::DailyJob.perform_async
end

task pull_prod: :environment do
  Maintenance::DailyJob.perform_async
end
