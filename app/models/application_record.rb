class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.projector
    "#{name}Projector".safe_constantize&.new || ApplicationProjector.new(self)
  end
end
