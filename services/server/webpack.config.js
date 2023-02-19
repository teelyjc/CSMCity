const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const srcPath = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
}

module.exports = {
  entry: path.resolve(srcPath.src, 'MainCSMCServer.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({/* options: see below */})],
    extensions: ['.tsx', '.ts', '.js'],
  },
  stats: {
    preset: 'minimal',
    assets: false,
    modules: false,
  },
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals({ modulesFromFile: true })], // in order to ignore all modules in node_modules folder
  output: {
    filename: 'CSMCServer.js',
    path: srcPath.dist,
    clean: true,
  },
};
