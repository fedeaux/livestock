import Database from "database";

export default function getStocksFromUser(userId, isAsync) {
  const query = `SELECT 'stocks'.* FROM 'stocks' INNER JOIN 'user_stocks'
     ON 'stocks'.'id' = 'user_stocks'.'stock_id'
     WHERE 'user_stocks'.'user_id' = ${userId}`

  if (isAsync) {
    return Database.performQuery(query);
  }

  return Data.performQuerySync(query);
}

export default function getUserStocksLinks(userId) {
  return getStocksFromUser(userId, false).map(() => {
    if(!stock.code) {
      return '';
    } else {
      return `https://www.marketwatch.com/investing/stock/${stock.code}`
    }
  });
}
