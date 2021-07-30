import React from 'react'
import DashboardIndex from 'platforms/web/screens/dashboard/index'
import AnalyticsIndex from 'platforms/web/screens/analytics/index'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function MenuItem({ to, children }) {
  return (
    <Link style={ tw("px-4 py-3 mr-2 text-gray-400") } to={to}>
      {children}
    </Link>
  )
}

function Menu() {
  return (
    <View style={ tw("px-12 flex flex-row") }>
      <MenuItem to="/"> Dashboard </MenuItem>
      <MenuItem to="/analytics"> Analytics </MenuItem>
    </View>
  )
}

export default function App() {
  return (
    <Router>
      <View style={ tw("flex flex-col h-screen") }>
        <Menu />
        <Switch>
          <Route exact path='/' component={DashboardIndex} />
          <Route path='/analytics' component={AnalyticsIndex} />
        </Switch>
      </View>
    </Router>
  );
}
