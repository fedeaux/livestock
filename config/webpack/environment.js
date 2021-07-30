const path = require('path');

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

const providedModules = [
  ['react-native-web', 'View'],
  ['react-native-web', 'Text'],
  ['react', 'useCallback'],
  ['react', 'useEffect'],
  ['react', 'useState'],
];

const provided = {
  React: 'react',
  tw: [path.resolve('app/styles/tw'), 'tw'],
  noop: [path.resolve('app/javascript/util/noop'), 'noop'],
};

providedModules.forEach((providedModule) => {
  provided[providedModule[providedModule.length - 1]] = providedModule;
});

environment.plugins.append('Provide', new webpack.ProvidePlugin(provided));

module.exports = environment
