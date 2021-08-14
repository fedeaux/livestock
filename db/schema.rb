# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_14_193109) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.bigint "sector_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["sector_id"], name: "index_companies_on_sector_id"
  end

  create_table "sectors", force: :cascade do |t|
    t.string "name"
    t.integer "category", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "stock_earnings", force: :cascade do |t|
    t.decimal "per_stock", precision: 15, scale: 10
    t.decimal "dy", precision: 15, scale: 2
    t.date "received_at"
    t.integer "category", default: 0
    t.bigint "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stock_id"], name: "index_stock_earnings_on_stock_id"
  end

  create_table "stock_prices", force: :cascade do |t|
    t.decimal "open", precision: 15, scale: 2, null: false
    t.decimal "high", precision: 15, scale: 2, null: false
    t.decimal "low", precision: 15, scale: 2, null: false
    t.decimal "close", precision: 15, scale: 2, null: false
    t.integer "volume", default: 0, null: false
    t.date "day", null: false
    t.bigint "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stock_id"], name: "index_stock_prices_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.bigint "company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_stocks_on_company_id"
  end

  create_table "user_stock_earnings", force: :cascade do |t|
    t.bigint "user_stock_id", null: false
    t.decimal "total", precision: 15, scale: 2
    t.decimal "per_stock", precision: 15, scale: 10
    t.integer "stock_count"
    t.date "received_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_stock_id"], name: "index_user_stock_earnings_on_user_stock_id"
  end

  create_table "user_stock_operations", force: :cascade do |t|
    t.integer "nature"
    t.bigint "user_stock_id", null: false
    t.integer "stock_count"
    t.decimal "stock_price", precision: 15, scale: 2
    t.decimal "total", precision: 15, scale: 2
    t.date "executed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_stock_id"], name: "index_user_stock_operations_on_user_stock_id"
  end

  create_table "user_stocks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "stock_count"
    t.decimal "average_price_per_stock", precision: 15, scale: 2
    t.decimal "price", precision: 15, scale: 2
    t.decimal "market_price_per_stock", precision: 15, scale: 2
    t.decimal "market_price", precision: 15, scale: 2
    t.decimal "earnings", precision: 15, scale: 2
    t.decimal "wallet_ratio", precision: 15, scale: 8, default: "0.0"
    t.bigint "wallet_id"
    t.decimal "market_result", precision: 15, scale: 2, default: "0.0"
    t.decimal "market_result_ratio", precision: 15, scale: 8, default: "0.0"
    t.decimal "payout", precision: 15, scale: 2, default: "0.0"
    t.decimal "payout_ratio", precision: 15, scale: 8, default: "0.0"
    t.index ["stock_id"], name: "index_user_stocks_on_stock_id"
    t.index ["user_id"], name: "index_user_stocks_on_user_id"
    t.index ["wallet_id"], name: "index_user_stocks_on_wallet_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "wallets", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.decimal "price", precision: 15, scale: 2, default: "0.0"
    t.decimal "price_ratio", precision: 15, scale: 8, default: "0.0"
    t.decimal "market_price", precision: 15, scale: 2, default: "0.0"
    t.decimal "market_price_ratio", precision: 15, scale: 8, default: "0.0"
    t.decimal "market_result", precision: 15, scale: 2, default: "0.0"
    t.decimal "market_result_ratio", precision: 15, scale: 8, default: "0.0"
    t.decimal "earnings", precision: 15, scale: 2, default: "0.0"
    t.decimal "earnings_ratio", precision: 15, scale: 8, default: "0.0"
    t.decimal "payout", precision: 15, scale: 2, default: "0.0"
    t.decimal "payout_ratio", precision: 15, scale: 8, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_wallets_on_user_id"
  end

  add_foreign_key "companies", "sectors"
  add_foreign_key "stock_earnings", "stocks"
  add_foreign_key "stock_prices", "stocks"
  add_foreign_key "stocks", "companies"
  add_foreign_key "user_stock_earnings", "user_stocks"
  add_foreign_key "user_stock_operations", "user_stocks"
  add_foreign_key "user_stocks", "stocks"
  add_foreign_key "user_stocks", "users"
  add_foreign_key "wallets", "users"
end
