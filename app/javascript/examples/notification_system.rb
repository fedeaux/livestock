BraindamageNotifiable.config do |config|
  config.notification(
    model: 'Normandy' # default: Notification
  )

  config.recipient(
    model: 'Ucla' # default: User
  )

  config.join_model(
    model: 'UclaNormandy', # default: UserNotification
    read_status_column: 'star', # default: read
    read_status_mode: 'boolean' # Nice to have: count
  )
end
