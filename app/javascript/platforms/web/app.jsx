import React from "react";
import DashboardIndex from "platforms/web/screens/dashboard";
import MovementsIndex from "platforms/web/screens/movements";
import AnalyticsIndex from "platforms/web/screens/analytics";
import WalletsIndex from "platforms/web/screens/wallets";
import StockShowIndex from "platforms/web/screens/stock_show";
import Stocks from "platforms/web/screens/stocks";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function MenuItem({ to, children }) {
  return (
    <Link style={tw("no-underline px-4 py-3 mr-2")} to={to}>
      <Text style={tw("text-gray-400")}>{children}</Text>
    </Link>
  );
}

function Menu() {
  return (
    <View style={tw("sticky px-12 flex flex-row")}>
      <MenuItem to="/"> Dashboard </MenuItem>
      <MenuItem to="/movements"> Movements </MenuItem>
      <MenuItem to="/analytics"> Analytics </MenuItem>
      <MenuItem to="/stocks"> Stocks </MenuItem>
      <MenuItem to="/wallets"> Wallets </MenuItem>
    </View>
  );
}

export default function App() {
  return (
    <Router>
      <View style={tw("flex flex-col h-full")}>
        <Menu />
        <View style={tw("flex flex-grow")}>
          <Switch>
            <Route exact path="/" component={DashboardIndex} />
            <Route path="/movements" component={MovementsIndex} />
            <Route path="/analytics" component={AnalyticsIndex} />
            <Route path="/wallets" component={WalletsIndex} />
            <Route path="/stocks/:id" component={StockShowIndex} />
            <Route path="/stocks" component={Stocks} />
          </Switch>
        </View>
      </View>
    </Router>
  );
}
