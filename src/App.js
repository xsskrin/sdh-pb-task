import './utils/forceHttps';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { AppView } from 'comps';
import { ChakraProvider } from "@chakra-ui/react"
import Routes from './Routes';
import 'styles/main.sass';

const App = () => {
	return (
		<ChakraProvider>
			<AppView>
				<Routes />
			</AppView>
		</ChakraProvider>
	);
};

const isDevelopment = ['staging', 'production'].includes(process.env.NODE_ENV);
const AppRender = isDevelopment ? hot(module)(App) : App;

ReactDOM.render(<AppRender />, document.getElementById('app'));
