class AddCategoryAndCurrencyToStock < ActiveRecord::Migration[6.1]
  def change
    add_column :stocks, :category, :integer, default: 0
    add_column :stocks, :currency, :integer, default: 0

    Stock.find_each do |stock|
      unless stock.company.market?
        stock.update(category: 1)
      end
    end

    remove_column :stocks, :company_id, :integer, default: 0
  end
end
