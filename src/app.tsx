import React from 'react';
import Cards from './components/cards';
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
	const [city, setCity] = useState(null);

	return (
		<>
			<Header />
			<Main>
				<Cards />
				<Construction />
				<Action />
				<Result value='0'></Result>
			</Main>
		</>
	);
}

export default App;
