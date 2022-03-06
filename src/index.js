import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.tsx';
import '@fortawesome/fontawesome-free/js/all.js';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/global-styles';
import ConstructionsPresenter from './presenter/constructions/constructions';

const constructionsPresenter = new ConstructionsPresenter({
	land: false,
	villa: false,
	building: false,
	hotel: false,
	landmark: false,
	flag: false,
	parasol: false,
	bangalore: false,
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<App constructionsPresenter={constructionsPresenter} />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
