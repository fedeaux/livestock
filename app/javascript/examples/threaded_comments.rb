BraindamageThreadedComments.config do |config|
  config.notification(
    model: 'Communist' # default: Comment
  )

  config.author(
    model: 'Umbrella' # default: User
  )

  config.websocket(
    # default: CommentsChannel, or CommunistsChannel
    channel: 'CocoaChannel',
    enabled: 'True',
  )

  config.options(
    reply_depth: 12, # default: 1, 0 for no reply
  )
end

# canEditComment/canDestroyComment =>
# default: umbrella.id == communist.umbrella_id || embrella.role == "admin"

# if you want something else you can write your own
def can_edit_comment?
end
