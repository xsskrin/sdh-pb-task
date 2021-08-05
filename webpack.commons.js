const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config({
	path: path.resolve(__dirname, '.env'),
});

const envir = process.env.ENVIRONMENT || process.env.NODE_ENV || 'development';

module.exports = {
	entry: {
		bundle: './src/App.js',
	},
	output: {
		path: path.resolve(__dirname, 'server/public/'),
		publicPath: '/public/',
		filename: '[name].[contenthash].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/env', '@babel/preset-react'],
					plugins: [
						['@babel/transform-runtime', { regenerator: true }],
						['@babel/plugin-proposal-class-properties'],
						['babel-plugin-styled-components'],
					],
				},
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
						},
					},

				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: [/icons/, /images/, /raws/, /seo/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				include: [/images/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				include: [/icons/],
				loader: '@svgr/webpack',
			},
			{
				test: /\.svg$/,
				include: [/raws/],
				loader: 'raw-loader',
			},
			{
				test: /\.svg$/,
				include: [/seo/],
				loader: 'html-loader',
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							self: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.tsx', '.ts', '.js'],
		modules: [
			path.resolve(__dirname, 'src/'),
			path.resolve(__dirname, 'node_modules/'),
		],
		alias: {
			'icons': 'assets/icons',
			'images': 'assets/images',
			'raws': 'assets/raws',
			'static': '/static',
		},
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			'NODE_ENV': 'production',
			'ENVIRONMENT': envir,
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'server/app.html'),
			filename: path.resolve(__dirname, 'server/views/app.html'),
			chunks: ['bundle'],
			envir,
		}),
	],
};
