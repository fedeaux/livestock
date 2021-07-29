class CreateStocks < ActiveRecord::Migration[6.1]
  def change
    create_table :stocks do |t|
      t.string :name
      t.string :code
      t.belongs_to :company, null: false, foreign_key: true
      t.integer :category, default: 0

      t.timestamps
    end
  end
end
