require_relative './pathable'

class BaseGenerator
  include Pathable
  attr_reader :braindamage_generator
  delegate :inject_into_file, to: :braindamage_generator

  def self.order
    999
  end

  def initialize(braindamage_generator)
    @braindamage_generator = braindamage_generator
  end

  def entities
    @entities ||= Dir.glob("#{Rails.root.join('app/javascript/generated/schemas/').to_s}*.js").map do |schema_path|
      singular_underscore_name = schema_path.split('/').last.split('.')[0..-2].join('.')
      Entity.new singular_underscore_name
    end
  end

  def pretty_print_thing(thing, indent)
    indentation = '  '*indent

    lines = []

    if thing.respond_to? :pretty_printable
      return pretty_print_thing thing.pretty_printable, indent
    elsif thing.is_a? Hash
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
    elsif thing.nil?
      lines = ['null']
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

  def base_template(source, *args, &block)
    braindamage_generator.template source, *args, &block
  end

  def template(source, *args)
    config = args.last.is_a?(Hash) ? args.pop : {}
    target = args.first
    generated = target.to_s.include? 'generated'

    unless braindamage_generator.options[:dumb]
      if generated
        config[:force] = true
      else
        config[:skip] = true
      end
    end

    base_template source, target, config
  end
end
