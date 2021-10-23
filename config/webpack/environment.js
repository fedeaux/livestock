const path = require('path');
const Dotenv = require('dotenv-webpack');

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
  ['react', 'createContext'],
  ['react', 'useCallback'],
  ['react', 'useContext'],
  ['react', 'useEffect'],
  ['react', 'useMemo'],
  ['react', 'useState'],
];

const provided = {
  React: 'react',
  axios: 'axios',
  getColor: [path.resolve('app/javascript/styles/tw'), 'getColor'],
  noop: [path.resolve('app/javascript/util/noop'), 'noop'],
  tw: [path.resolve('app/javascript/styles/tw'), 'tw'],
  useBoolState: [path.resolve('app/javascript/util/useBoolState'), 'default'],
};

providedModules.forEach((providedModule) => {
  provided[providedModule[providedModule.length - 1]] = providedModule;
});

environment.plugins.append('Provide', new webpack.ProvidePlugin(provided));
environment.plugins.append('Dotenv', new Dotenv({ systemvars: true }));

module.exports = environment
