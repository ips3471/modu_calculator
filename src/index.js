import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.tsx';
import '@fortawesome/fontawesome-free/js/all.js';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/global-styles';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
