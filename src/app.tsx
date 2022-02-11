import React, { useEffect } from 'react';
import Cards, { Card } from './components/cards';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import Construction from './components/select-construction';
import Action from './components/select-action';

const Result = styled.input``;

const Main = styled.main`
	margin: ${props => props.theme.side_padding};
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

function App() {
	const [city, setCity] = useState<Card | null>(null);

	const updateCity = (city: Card) => {
		setCity(city);
	};

	useEffect(() => {
		// inform developer the City state when that is changed
		console.log(city);
	}, [city]);

	return (
		<>
			<Header />
			<Main>
				<Cards updateCity={updateCity} />
				<Construction />
				<Action />
				<Result value='0'></Result>
			</Main>
		</>
	);
}

export default App;
