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

ActiveRecord::Schema.define(version: 2021_07_15_184215) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stocks", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "risk"
  end

  create_table "user_stock_dividends", force: :cascade do |t|
    t.bigint "user_stock_id", null: false
    t.decimal "total", precision: 15, scale: 2
    t.decimal "per_stock", precision: 15, scale: 2
    t.integer "stock_count"
    t.date "received_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_stock_id"], name: "index_user_stock_dividends_on_user_stock_id"
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
    t.index ["stock_id"], name: "index_user_stocks_on_stock_id"
    t.index ["user_id"], name: "index_user_stocks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "user_stock_dividends", "user_stocks"
  add_foreign_key "user_stock_operations", "user_stocks"
  add_foreign_key "user_stocks", "stocks"
  add_foreign_key "user_stocks", "users"
end
