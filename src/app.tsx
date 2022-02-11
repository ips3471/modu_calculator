import React, { useEffect } from 'react';
import Cards, {
	Card,
	GeneralCostForNormalCity,
	GeneralCostForVacationSpot,
} from './components/cards';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import SelectConstruction from './components/select-construction';
import Action from './components/select-action';

const Result = styled.input``;

const Main = styled.main`
	margin: ${props => props.theme.side_padding};
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export type GeneralCost = GeneralCostForNormalCity & GeneralCostForVacationSpot;

export type ConstructionStates<T> = {
	[key in keyof T]: boolean;
};

function App() {
	const [city, setCity] = useState<Card | null>(null);
	// construction과 acation을 가져와서 city의 cost와 mapping
	const [constructionStates, setConstructionStates] = useState<
		ConstructionStates<GeneralCost>
	>({
		land: false,
		villa: false,
		building: false,
		hotel: false,
		landmark: false,
		flag: false,
		parasol: false,
		bangalore: false,
	});

	const updateConstructionStates = (
		name: keyof ConstructionStates<GeneralCost>,
	) => {
		setConstructionStates(constructionStates => {
			const states = { ...constructionStates };
			states[name] = !constructionStates[name];
			return states;
		});
		console.log(constructionStates[name]);
	};

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
				<SelectConstruction
					city={city}
					constructionStates={constructionStates}
					updateConstructionStates={updateConstructionStates}
				/>
				<Action />
				{/* <Result value='0'></Result> */}
			</Main>
		</>
	);
}

export default App;
