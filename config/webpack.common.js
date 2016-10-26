'use strict';

const webpack = require('webpack');
const helpers = require('./helpers');
var atImport = require('postcss-import');

// use to insert script elements points to webpack bundles in the main index.html file
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // entry points for the three bundles, order does not matter
  entry: {
    'vendor': './src/js/vendor.ts',
    'polyfills': './src/js/polyfills.ts',
    'app': './src/js/main.ts'
  },

  // allows us to require modules using
  // import { someExport } from './my-module';
  // instead of
  // import { someExport } from './my-module.ts';
  // with the extensions in the list, it can be omitted from the import
  // root is an absolute path to the folder containing our application modules
  resolve: {
    extensions: ['', '.ts', '.js', '.json'], // order matters, resolves left to right
		root: helpers.root('src','js')
  },

  module: {
    loaders: [
      // process all TypeScript files except for unit testing and end-to-end testing
      // with the TypeScript loader
      // this will transpile the TypeScript to JavaScript, and return the JavaScript
      // to webpack for further processing
      // Tesing files are excluded because they are not included in the application
      // output
      // There is a special webpack config file for testing purposes which is separate
      // from this configuration
      {
        test: /\.ts$/,
        exclude: [ /\.(spec|e2e)\.ts$/ ],
        loader: 'ts'
      },
      // processes JSON files, useful for config files and mock data
      {
        test: /\.json$/,
        loader: 'json'
      },
      // processes HTML files into JavaScript files
      // useful for bundling HTML with Angular Component
      {
        test: /\.html$/,
        exclude: [ helpers.root('src','index.html') ],
        loader: 'html'
      },
      // outputs images and font files to a common assets folder
      // updates HTML and CSS paths which reference these files
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // transpiles global SASS stylesheets
			{
			  test: /\.scss$/,
        exclude: [ helpers.root('src','js') ],
			  loaders: ['style','css','postcss','sass'] // loader order is executed right to left
			},
      // transpiles component SASS stylesheets
			{
			  test: /\.scss$/,
        exclude: [ helpers.root('src','css') ],
			  loaders: ['raw','postcss','sass'] // loader order is executed right to left
			}
    ]
  },

  // configuration for the postcss loader which modifies CSS after
  // processing
  // autoprefixer plugin for postcss adds vendor specific prefixing for
  // non-standard or experimental css properties
  postcss: [ require('autoprefixer') ],

  // gives an annoying warning from postcss which cannot be resolved
  // so we are choosing to ignore it
  resolveUrlLoader: { silent: true },

  plugins: [

    // this one is a little complex to understand
    // when app bundle code imports vendor bundle code, webpack will want to include the
    // the vendor code in the app bundle, this makes sense when we think of webpack as a
    // bundler which bundles all imported code together
    // but this is NOT what we want webpack to do
    // instead, we want webpack to keep the three bundles separate, and once all are loaded
    // in the web browser we trust it will all work, and all three will work together
    // as expect
    // so this plugin keeps the three bundle separated and does not put the code of one,
    // in the code of another

    // order of the names does matter
    // order establishes a hierarchy
    // app -> vendor -> polyfills
    // which means app depends upon vendor, and vendor upon polyfills
    // therefore, polyfills will be loaded first (script element appear first in index.html)
    // vendor will be loaded next, and finally app
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // configure the file to have the bundle script elements injected
    // this is almost always the main html for the initial loading of 
    // the site
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]

};
