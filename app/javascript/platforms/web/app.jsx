import React from 'react'
import DashboardIndex from 'platforms/web/screens/dashboard/index'
import AnalyticsIndex from 'platforms/web/screens/analytics/index'

function MenuItem(props) {
  return <Text style={ tw("px-4 py-3 mr-2 text-gray-400 font-lg") } {...props} />;
}

function Menu() {
  return (
    <View style={ tw("flex flex-row") }>
      <MenuItem> Dashboard </MenuItem>
      <MenuItem> Analytics </MenuItem>
    </View>
  )
}

export default function App() {
  return (
    <View style={ tw("flex flex-column h-screen") }>
      <Menu />
      <AnalyticsIndex />
    </View>
  );
}
