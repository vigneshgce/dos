var path = require('path'),
  webpack = require('webpack'),
  // Bind join to the current path. You can change it:
  // path.join.bind(path, __dirname, 'app').
  join = path.join.bind(path, __dirname);

module.exports = {
  entry: {
    // The entrypoint is our vendor file
    vendor: [ join('vendor', 'vendor.js') ]
  },
  output: {
    // The bundle file
    path: join('build'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      // The manifest we will use to reference the libraries
      path: join('vendor', '[name]-manifest.json'),
      name: '[name]',
      context: join('vendor')
    })
  ],
  resolve: {
    root: join('vendor'),
    modulesDirectories: ['node_modules']
  }
}