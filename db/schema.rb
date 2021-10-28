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

ActiveRecord::Schema.define(version: 2021_10_28_000028) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stock_earnings", force: :cascade do |t|
    t.decimal "per_stock", precision: 15, scale: 10
    t.decimal "dy", precision: 15, scale: 2
    t.date "received_at"
    t.integer "category", default: 0
    t.bigint "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.date "provided_at"
    t.index ["stock_id"], name: "index_stock_earnings_on_stock_id"
  end

  create_table "stock_kpis", force: :cascade do |t|
    t.decimal "price", precision: 15, scale: 8
    t.decimal "dy", precision: 15, scale: 8
    t.decimal "p_to_e", precision: 15, scale: 8
    t.decimal "p_to_ev", precision: 15, scale: 8
    t.decimal "p_to_ebit", precision: 15, scale: 8
    t.decimal "ev_to_ebit", precision: 15, scale: 8
    t.decimal "nd_to_ebit", precision: 15, scale: 8
    t.decimal "nd_to_ev", precision: 15, scale: 8
    t.decimal "psr", precision: 15, scale: 8
    t.decimal "roe", precision: 15, scale: 8
    t.decimal "roa", precision: 15, scale: 8
    t.decimal "roic", precision: 15, scale: 8
    t.decimal "bvps", precision: 15, scale: 8
    t.decimal "eps", precision: 15, scale: 8
    t.decimal "p_to_bv", precision: 15, scale: 8
    t.decimal "p_to_eps", precision: 15, scale: 8
    t.date "date"
    t.bigint "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "opdy", precision: 15, scale: 8, default: "0.0"
    t.integer "ddpy", default: 0
    t.bigint "adl", default: 0
    t.decimal "cagr_r", precision: 15, scale: 4
    t.decimal "cagr_e", precision: 15, scale: 4
    t.index ["stock_id"], name: "index_stock_kpis_on_stock_id"
  end

  create_table "stock_prices", force: :cascade do |t|
    t.decimal "open", precision: 15, scale: 2, null: false
    t.decimal "high", precision: 15, scale: 2, null: false
    t.decimal "low", precision: 15, scale: 2, null: false
    t.decimal "close", precision: 15, scale: 2, null: false
    t.bigint "volume", default: 0, null: false
    t.date "day", null: false
    t.bigint "stock_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "dividend_amount", precision: 15, scale: 2
    t.index ["stock_id"], name: "index_stock_prices_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "category", default: 0
    t.integer "currency", default: 0
    t.string "sector"
    t.string "subsector"
    t.string "segment"
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
    t.integer "wallet_id"
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
    t.decimal "target_percentage", precision: 15, scale: 8, default: "0.0"
    t.string "key"
    t.index ["user_id"], name: "index_wallets_on_user_id"
  end

  add_foreign_key "stock_earnings", "stocks"
  add_foreign_key "stock_kpis", "stocks"
  add_foreign_key "stock_prices", "stocks"
  add_foreign_key "user_stock_earnings", "user_stocks"
  add_foreign_key "user_stock_operations", "user_stocks"
  add_foreign_key "user_stocks", "stocks"
  add_foreign_key "user_stocks", "users"
  add_foreign_key "wallets", "users"
end
