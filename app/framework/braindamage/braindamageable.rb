require Rails.root.join 'lib/generators/braindamage/core/nameable'

module Braindamage::Braindamageable
  extend ActiveSupport::Concern

  included do
    self.exposed_attributes = {}
    self.exposed_enums = {}
    self.extend Nameable

    columns.each do |column|
      default = column.default

      if column.type == :integer and column.default.is_a? String
        default = default.to_i
      end

      expose column.name, {
               name: column.name,
               type: column.type,
               default: default
             }

    end


    if self.exposed_attributes["id"]
      self.exposed_attributes["id"].writeable = false
    end
  end

  module ClassMethods
    attr_accessor :exposed_attributes
    attr_accessor :exposed_enums

    def exposed_enum(definitions)
      name = definitions.keys.first
      value_map = definitions.values.first
      options = definitions.except(name)
      inverted_value_map = value_map.invert

      self.exposed_enums[name] = Braindamage::Enum.new({
        name: name,
        value_map: value_map,
        options: options
      })

      enum definitions

      # Look for raw exposed attribute
      if self.exposed_attributes[name.to_s]
        default_value = self.exposed_attributes[name.to_s].default

        self.exposed_attributes[name.to_s].type = "string"

        if inverted_value_map[default_value]
          self.exposed_attributes[name.to_s].default = inverted_value_map[default_value]
        end
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

    def expose_associations
      # relationships
      reflections.values.select do |reflection|
        [:belongs_to, :has_many, :has_one].include? reflection.macro
      end.each do |reflection|
        expose reflection.name,
               type: reflection.macro,
               model: reflection.class_name
      end
    end

    def hide(name)
      exposed_attributes.delete name.to_s
    end

    def cache_key(query = {})
      {
        # TODO: Review collection cache keys
        name: "#{self.plural_underscore_name}/#{query.to_json}",
        updated_at: false,
      }
    end
  end

  def cache_key
    {
      name: "#{self.class.singular_underscore_name}##{id}",
      updated_at: updated_at
    }
  end
end
