const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const webpack = require('webpack');

const path = require('path');

const config = {
	entry: './src/app.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({template: './index.html'}),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = config;
