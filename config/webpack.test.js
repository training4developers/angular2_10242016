'use strict';

const helpers = require('./helpers');

module.exports = {

	// outputs source map for error reporting
	// when unit tests fail, karma will display the TypeScript line number instead
	// of the JavaScript bundle line number
  devtool: 'inline-source-map',

  // allows us to require modules using
  // import { someExport } from './my-module';
  // instead of
  // import { someExport } from './my-module.ts';
  // with the extensions in the list, it can be omitted from the import
  // root is an absolute path to the folder containing our application modules
  resolve: {
    extensions: ['', '.ts', '.js', '.json'],  // order matters, resolves left to right
		root: helpers.root('src','js')
  },

  module: {

    loaders: [
			// transpile TypeScript to JavaScript
			{ test: /\.ts$/, loader: 'ts' },
			// package HTML as JavaScript modules
      { test: /\.html$/, loader: 'html' },
			// ignore image and font files for unit testing
      { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'null' },
			// package SASS files as JavaScript modules
			// this is needed otherwise Angular 2 complains that styleUrls is not a stylesheet
			// the actual style definitions are not used in unit testing
      // unlike the webpack dev config, we do not need to account for the global stylesheet
			{ test: /\.scss$/, loaders: ['raw','postcss','sass'] }
    ],

		// processes the files through istanbul to add code coverage
		postLoaders: [{
      test: /\.(js|ts)$/,
      loader: 'istanbul-instrumenter-loader',
      include: helpers.root('src', 'js'),
      exclude: [ /\.(e2e|spec)\.ts$/, /node_modules/ ]
    }]

  },
}
