class Braindamage::Query
  attr_reader :query_params

  def initialize(query_params = {})
    @query_params = query_params

    if includes?
      if @query_params[:includes].is_a? Array
        @query_params[:includes] = @query_params[:includes].map do |key|
          [key, {}]
        end.to_h
      end

      @query_params[:includes].keys.each do |key|
        sub_query = @query_params[:includes][key]

        if sub_query.is_a? Hash
          @query_params[:includes][key] = Braindamage::Query.new sub_query
        elsif sub_query.is_a? Array
          @query_params[:includes][key] = Braindamage::Query.new sub_query.map do |subkey|
            [subkey, {}]
          end.to_h
        else
          @query_params[:includes][key] = Braindamage::Query.new
        end
      end
    end
  end

  def self.from_json(json_query_params)
    new(
      JSON.parse(
        json_query_params || "{}"
      ).deep_transform_values do |value|
        value.is_a?(String) ? value.underscore : value
      end.deep_transform_keys do |key|
        key.is_a?(String) ? key.underscore.to_sym : value
      end
    )
  end

  def includes?(key = nil)
    @query_params.key?(:includes) &&
      (!key || @query_params[:includes].key?(key))
  end

  def includes(key)
    @query_params.key?(:includes) && @query_params[:includes][key]
  end

  def default_query_params
    {}
  end
end
