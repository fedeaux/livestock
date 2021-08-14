require_relative './pathable'

class BaseGenerator
  include Pathable
  attr_reader :braindamage_generator
  delegate :template, to: :braindamage_generator

  def initialize(braindamage_generator)
    @braindamage_generator = braindamage_generator
  end

  def pretty_print_thing(thing, indent)
    indentation = '  '*indent

    lines = []

    if thing.is_a? Hash
      lines.push "{"
      # key_value_lines = []
      thing.each do |key, value|
        printable_key = if key.is_a?(Numeric)
                          "\"#{key}\""
                        else
                          key.to_s.gsub(/^_+/, '').camelize(:lower)
                        end
        lines.push "  #{printable_key}: #{pretty_print_thing(value, indent + 1)},"
      end

      lines.push "}"
    elsif thing.is_a? Array
      lines.push "["
      # key_value_lines = []
      thing.each do |value|
        lines.push "  #{pretty_print_thing(value, indent + 1)},"
      end
      lines.push "]"
    elsif thing.is_a?(Numeric) || thing.in?([true, false])
      lines = [thing]
    elsif thing.is_a?(String) || thing.is_a?(Symbol)
      lines = ["\"#{thing}\""]
    end

    lines.join "\n#{indentation}"
  end

  def pretty_print_thing_object_methods(object, indent, methods)
    hash = {}

    methods.each do |method|
      hash[method] = object.send(method)
    end

    pretty_print_thing hash, indent
  end
end
