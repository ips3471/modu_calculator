import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.tsx';
import '@fortawesome/fontawesome-free/js/all.js';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/global-styles';
import ConstructionsPresenter from './presenter/constructions/constructions';
import ActionsPresenter from './presenter/actions/actions';
import CardsPresenter from './presenter/cards/cards';
import CardsDB from './model/db/cards/cards';
import swDev from './swDev';
import { constructionsData } from './model/db/constructions/constructions';
import { actionsData } from './model/db/actions/actions';

const constructionsPresenter = new ConstructionsPresenter(constructionsData);

const actionsPresenter = new ActionsPresenter(actionsData);

const cardsPresenter = new CardsPresenter(new CardsDB());

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<App
				constructionsPresenter={constructionsPresenter}
				actionsPresenter={actionsPresenter}
				cardsPresenter={cardsPresenter}
			/>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
swDev();
