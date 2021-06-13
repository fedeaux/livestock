class AddRiskToStock < ActiveRecord::Migration[6.1]
  def change
    add_column :stocks, :risk, :integer
  end
end
