const { environment } = require('@rails/webpacker')

const webpack = require('webpack');

const react =  {
  test: /\.(js|jsx)$/,
  use: [{
    loader: 'babel-loader',
    options: {
      "presets": ["@babel/preset-env", "@babel/preset-react"], //, "@babel/preset-flow"
      "plugins": [
        ["@babel/plugin-proposal-class-properties"]
      ]
    }
  }]
};

environment.loaders.append('react', react);

environment.resolve = {
  alias: {
    'react-native$': 'react-native-web'
  }
}

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  React: 'react',
  View: ['react-native-web', 'View'],
  Text: ['react-native-web', 'Text'],
  tw: 'tailwind-rn'
  // Button: ['react-native', 'Button'],
  // Pressable: ['react-native', 'Pressable'],
  // ScrollView: ['react-native', 'ScrollView']
}));

module.exports = environment
