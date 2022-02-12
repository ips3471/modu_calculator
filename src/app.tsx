import React, { useEffect } from 'react';
import Cards, {
	ActionForNormalCity,
	ActionForVacationSpot,
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

export type ConstructionStates<T> = {
	[key in keyof T]: boolean;
};
function App() {
	const [city, setCity] = useState<Card | null>(null);
	const [selectedConstructions, setSelectedConstructions] = useState<
		ConstructionStates<
			GeneralCostForNormalCity & GeneralCostForVacationSpot
		>
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
	const [actionType, setActionType] = useState<
		keyof ActionForNormalCity | keyof ActionForVacationSpot | null
	>('buy'); //static
	const updateConstructionStates = (
		constructionName: keyof (GeneralCostForNormalCity &
			GeneralCostForVacationSpot),
	) => {
		setSelectedConstructions(selectedConstructions => {
			const states = { ...selectedConstructions };
			states[constructionName] = !selectedConstructions[constructionName];
			return states;
		});
	};
	useEffect(() => {
		console.log(selectedConstructions);
	}, [selectedConstructions]);
	const updateCity = (city: Card) => {
		setCity(city);
	};
	useEffect(() => {
		// inform developer the City state when that is changed
		console.log('selected', city);
	}, [city]);

	return (
		<>
			<Header />
			<Main>
				<Cards updateCity={updateCity} />
				<SelectConstruction
					city={city}
					constructionStates={selectedConstructions}
					updateConstructionStates={updateConstructionStates}
				/>
				<Action />
				<Result></Result>
			</Main>
		</>
	);
}

export default App;
