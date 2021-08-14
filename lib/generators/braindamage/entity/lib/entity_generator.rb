require_relative '../../core/nameable'
require_relative '../../core/base_generator'
require_relative '../../core/entity'

class EntityGenerator < BaseGenerator
  delegate :exposed_attributes, :exposed_enums, :validators, to: :model

  def initialize(braindamage_generator)
    super
    @entity = Entity.new braindamage_generator.name
  end

  def method_missing(name, *args)
    super unless @entity.respond_to?(name)
    @entity.send(name, *args)
  end

  def respond_to?(name)
    super || @entity.respond_to?(name)
  end
end
