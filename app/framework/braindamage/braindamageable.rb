module Braindamage::Braindamageable
  extend ActiveSupport::Concern

  included do
    self.exposed_attributes = {}
    self.exposed_enums = {}

    columns.each do |column|
      expose column.name, {
        name: column.name,
        type: column.type,
        default: column.default
      }
    end

    if self.exposed_attributes["id"]
      self.exposed_attributes["id"].writeable = false
    end

    # Other duct tape (Declare belongs_to fields)
    # reflections.values.select do |reflection|
    #   reflection.macro == :belongs_to
    # end.each do |belongs_to_reflection|
    #   return unless attribute = exposed_attributes[belongs_to_reflection.name.to_s]

    #   if
    #     puts
    #   end
    # end
  end

  module ClassMethods
    attr_accessor :exposed_attributes
    attr_accessor :exposed_enums

    def exposed_enum(definitions)
      name = definitions.keys.first
      value_map = definitions.values.first
      options = definitions.except(name)

      self.exposed_enums[name] = {
        name: name,
        value_map: value_map,
        options: options
      }

      enum definitions

      # DUCT TAPE!! Take away from here
      if self.exposed_attributes[name.to_s]
        self.exposed_attributes[name.to_s].type = "string"
      end
    end

    def exposed_delegate(*methods, to: nil, prefix: nil, allow_nil: nil)
      methods.each do |method|
        exposed_attributes[method.to_s] = Braindamage::Attribute.new({ name: method })
      end

      delegate(*methods, to: to, prefix: prefix, allow_nil: allow_nil)
    end

    def expose(name, properties = {})
      exposed_attributes[name.to_s] = Braindamage::Attribute.new(properties.merge(name: name))
    end

    def hide(name)
      exposed_attributes.delete name.to_s
    end
  end
end
