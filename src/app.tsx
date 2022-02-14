import React, { useEffect } from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import SelectConstruction from './components/select-construction';
import SelectAction from './components/select-action';
import {
	ActionTypes,
	Card,
	ConstructionTypes,
	IsConstructingStates,
	IsExecutingStates,
} from './assets/interfaces/interfaces';
import CardsSection from './components/cards';

const Result = styled.input``;

const Main = styled.main`
	margin: ${props => props.theme.side_padding};
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

function App() {
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	const [selectedConstructions, setSelectedConstructions] =
		useState<IsConstructingStates>({
			land: false,
			villa: false,
			building: false,
			hotel: false,
			landmark: false,
			flag: false,
			parasol: false,
			bangalore: false,
		});

	const [selectedActions, setSelectedActions] = useState<IsExecutingStates>({
		buy: false,
		pay: false,
		takeOver: false,
		sell: false,
	});

	const updateSelectedConstructions = (type: ConstructionTypes) => {
		setSelectedConstructions(current => {
			const states = { ...current };
			states[type] = !current[type];
			return states;
		});
	};

	const updateSelectedActions = (type: ActionTypes) => {
		setSelectedActions(current => {
			const states = { ...current };
			states[type] = !current[type];
			return states;
		});
	};

	const updateSelectedCard = (card: Card) => {
		setSelectedCard(card);
	};

	const getResult = () => {
		console.log('get result');
		return 0;
	};

	useEffect(() => {
		getResult();
	}, [selectedConstructions, selectedActions]);

	return (
		<>
			<Header />
			<Main>
				<CardsSection updateCard={updateSelectedCard} />
				<SelectConstruction
					card={selectedCard}
					actions={selectedActions}
					constructions={selectedConstructions}
					updateConstructions={updateSelectedConstructions}
					updateActions={updateSelectedActions}
				/>
				<SelectAction
					actions={selectedActions}
					constructions={selectedConstructions}
					updateSelectedActions={updateSelectedActions}
				/>
				<Result></Result>
			</Main>
		</>
	);
}

export default App;
