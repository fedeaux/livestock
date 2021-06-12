class PathPart
  attr_reader :path_part

  def initialize(path_part)
    @path_part = path_part
  end

  def entity?
    !param?
  end

  def param?
    @path_part.starts_with? ":"
  end
end
