class AddSectorSubsectorAndSegmentToStocks < ActiveRecord::Migration[6.1]
  def change
    add_column :stocks, :sector, :string
    add_column :stocks, :subsector, :string
    add_column :stocks, :segment, :string
  end
end
