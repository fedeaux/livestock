class DropSectorsAndCompanies < ActiveRecord::Migration[6.1]
  def change
    drop_table :companies
    drop_table :sectors
  end
end
