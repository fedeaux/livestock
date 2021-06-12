module Braindamageable
  extend ActiveSupport::Concern

  included do
    self.exposed_attributes = {}

    columns.each do |column|
      expose column.name, { name: column.name, type: column.type }
    end
  end

  module ClassMethods
    attr_accessor :exposed_attributes

    def expose(name, properties = {})
      exposed_attributes[name.to_s] = Braindamage::Attribute.new(properties.merge(name: name))
    end

    def hide(name)
      exposed_attributes.delete name.to_s
    end
  end
end
