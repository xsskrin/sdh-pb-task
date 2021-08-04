const dotenv = require('dotenv');
const path = require('path');

if (!dotenv.initialized) {
	dotenv.initialized = true;

	dotenv.config({
		path: path.resolve(__dirname, '../.env'),
	});
}

const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

const development = process.env.NODE_ENV === 'development';

if (development) {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackDevConfig = require('../webpack.dev');
	const compiler = webpack(webpackDevConfig);

	app.use(webpackDevMiddleware(compiler, {
		publicPath: '/public/',
		serverSideRender: true,
	}));

	app.use(webpackHotMiddleware(compiler));
} else {
	app.use('/public', express.static(path.resolve(__dirname, 'public'), {
		fallthrough: false,
	}));
}

app.use('/static', express.static(path.resolve(__dirname, 'static'), {
	fallthrough: false,
}));

app.get('*', (req, res) => {
	if (development) {
		const w = res.locals.webpack.devMiddleware;
		const { outputPath } = w.compiler;
		const html = w.outputFileSystem.readFileSync(
			path.resolve(outputPath, `../views/app.html`),
			'UTF-8',
		);
		res.send(html);
	} else {
		res.sendFile(path.resolve(__dirname, 'views/app.html'));
	}
});

const PORT = process.env.port || process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`sdh-recruitment works on port ${PORT}`); // eslint-disable-line
});
