class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "Notifications"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
