class ModelDecorator
  def initialize(decorated)
    @decorated = decorated
  end

  def method_missing(name, *args)
    super unless @decorated.respond_to?(name)
    @decorated.send(name, *args)
  end
end
