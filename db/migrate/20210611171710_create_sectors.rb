class CreateSectors < ActiveRecord::Migration[6.1]
  def change
    create_table :sectors do |t|
      t.string :name
      t.integer :category, default: 0

      t.timestamps
    end
  end
end
