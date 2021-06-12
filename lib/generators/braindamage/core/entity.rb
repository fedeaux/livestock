require_relative './nameable'

class Entity
  include Nameable
  attr_reader :name

  def initialize(name)
    @name = name
  end
end
