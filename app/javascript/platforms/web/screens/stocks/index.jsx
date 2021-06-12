import React from 'react'
import Stock from '../../../../models/stock'
import { View, Text } from 'react-native'

function withApiData(Component, path) {
  return (props) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch(path).then((response) => {
        return response.json()
      }).then((data) => {
        setData(data);
      })
    });

    return <Component {...data} {...props} />;
  }
}

function withModelIndex(Component, Model) {
  return withApiData(Component, Model.indexPath());
}

function withStockIndex(Component) {
  return withModelIndex(Component, Stock);
}

function StockList({ stocks, ...other }) {
  if(!stocks) {
    return null;
  }

  return <View>
           {stocks.map((stock) => {
             return <Text key={stock.id}>{stock.code}</Text>
           })}
         </View>;
}

export default withStockIndex(StockList);
