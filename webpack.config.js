const path = require('path')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimizate = () => {
	let config = {
		splitChunks: {
			chunks: 'all',
		},
	}

	if (isProd) {
		config = {
			minimize: true,
			minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
		}
	}

	return config
}

// module.exports = {
// context: path.resolve(__dirname, 'src'),
// mode: 'development',
// entry: {
// 	polyfill: 'babel-polyfill',
// 	app: './js/app.js',
// },
// output: {
// 	filename: '[name].[hash].js',
// 	path: path.resolve(__dirname, 'dist'),
// },
// 	optimization: optimizate(),
// 	devServer: {
// 		port: 3200,
// 		hot: isDev,
// 	},
// resolve: {
// 	extensions: ['.js', '.json', '.png', '.gif', '.scss'],
// 	alias: {
// 		'@models': path.resolve(__dirname, '/src/models'),
// 	},
// },
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: './index.html',
// 			minify: {
// 				collapseWhitespace: isProd,
// 			},
// 		}),
// 		new MiniCssExtractPlugin({
// 			filename: '[name].[hash].css',
// 		}),
// 		new CleanWebpackPlugin(),
// 		new OptimizeCssAssetsPlugin(),
// 		// new TerserPlugin(),
// 		// new CopyPlugin({
// 		// 	patterns: [
// 		// 		{
// 		// 			from: path.resolve(__dirname, 'src/favicon.ico'),
// 		// 			to: path.resolve(__dirname, 'dist'),
// 		// 		},
// 		// 	],
// 		// }),
// 	],
// 	module: {
// 		rules: [
// 			// {
// 			// 	test: /\.css$/,
// 			// 	use: [
// 			// 		{
// 			// 			loader: MiniCssExtractPlugin.loader,
// 			// 			options: {
// 			// 				hmr: isDev,
// 			// 				reloadAll: true,
// 			// 			},
// 			// 		},
// 			// 		'css-loader',
// 			// 	],
// 			// },
// 			{
// 				test: /\.scss$/,
// 				use: [
// 					{
// 						loader: MiniCssExtractPlugin.loader,
// 						options: {
// 							hmr: isDev,
// 							reloadAll: true,
// 						},
// 					},
// 					'css-loader',
// 					'sass-loader',
// 				],
// 			},
// {
// 	test: /\.(png|jpg|svg|gif)$/,
// 	use: ['file-loader'],
// },
// {
// 	test: /\.(ttf|woff|woff2|eot)$/,
// 	use: ['file-loader'],
// },
// 			{
// 				test: /\.xml$/,
// 				use: ['xml-loader'],
// 			},
// 			{
// 				test: /\.csv$/,
// 				use: ['csv-loader'],
// 			},
// 			{
// 				test: /\.xml$/,
// 				use: ['xml-loader'],
// 			},
// 			{},
// 		],
// 	},
// }

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		polyfill: 'babel-polyfill',
		app: './js/app.js',
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		port: 3200,
		hot: isDev,
	},
	resolve: {
		extensions: ['.js', '.json', '.png', '.gif', '.scss'],
		alias: {
			'@modules': path.resolve(__dirname, './src/js/modules'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
		}),
		new CleanWebpackPlugin(),
		// new OptimizeCssAssetsPlugin(),
		// new TerserPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.scss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader'],
			},
		],
	},
}
