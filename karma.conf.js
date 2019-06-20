const webpackConfig = require('./webpack.config');

const karmaConfig = (config) => {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		preprocessors: {
			'src/**/*.spec.ts': ['webpack'],
		},
		files: [
			'src/**/*.spec.ts'
		],
		reporters: ['mocha'],
		webpack: webpackConfig,
		port: 9090,
		colors: true,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: true,
	});
};

module.exports = karmaConfig;
