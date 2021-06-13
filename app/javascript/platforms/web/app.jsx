import React from 'react'
import StocksIndex from 'platforms/web/screens/stocks/index'
import UserStocksIndex from 'platforms/web/screens/user_stocks/index'

export default function App() {
  return (
    <>
      <StocksIndex />
      <UserStocksIndex />
    </>
  );
}
