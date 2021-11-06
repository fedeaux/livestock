class Seeders::StockTrends < Seeders::BaseSeeder
  def trending_stocks
    {
      "B3SA3" => '05/02/2021',
      "BBAS3" => '11/06/2021',
      "BBSE3" => '10/09/2021',
      "BRAP3" => '23/07/2021',
      "CMIG4" => '01/04/2020',
      "CPLE6" => '18/03/2020',
      "CSAN3" => '08/02/2019',
      "CSMG3" => '10/03/2020',
      "ENBR3" => '17/03/2020',
      "EVEN3" => '01/06/2021',
      "GOAU3" => '07/05/2021',
      "GOAU4" => '07/05/2021',
      "GRND3" => '01/08/2021',
      "KLBN4" => '04/03/2021',
      "KLBN11" => '04/03/2021',
      "PETR4" => '22/02/2021',
      "RAPT4" => '29/12/2020',
      "ROMI3" => '04/05/2021',
      "SAPR11" => '05/01/2021',
      "SUZB3" => '08/03/2021',
      "TAEE11" => '14/06/2021',
      "TIMS3" => '20/12/2019',
      "TRPL4" => '09/12/2020',
      "UNIP6" => '03/08/2021',
      "VBBR3" => '23/07/2021',
      "VIIA3" => '28/06/2021',
      "VIVT3" => '06/01/2020',
      "WIZS3" => '26/07/2021',
    }
  end

  def seed
    StockTrend.destroy_all

    trending_stocks.each do |code, started_at|
      stock = Stock.c(code)

      next unless stock

      stock_trend = stock
                      .stock_trends
                      .where(started_at: started_at)
                      .first_or_create

      ::StockTrends::Calculate.new(
        stock_trend.id
      ).call
    end
  end
end
