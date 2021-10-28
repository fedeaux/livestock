import consumer from "./consumer"

consumer.subscriptions.create("NotificationsChannel", {
  connected() {},
  disconnected() {},
  received(data) {}
});
