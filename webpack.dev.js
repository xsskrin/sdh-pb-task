const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.commons.js');

const PORT = process.env.PORT || process.env.port || 3000;

module.exports = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	entry: Object.keys(common.entry).reduce((acc, key) => {
		acc[key] = ['webpack-hot-middleware/client', common.entry[key]];
		return acc;
	}, {}),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: (url) => {
								return !url.includes('/static/');
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [
									'./src/styles/',
								],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
});
