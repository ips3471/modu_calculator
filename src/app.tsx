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
	CostTable,
	IsConstructingStates,
	IsExecutingStates,
	NormalCityLevel,
	VacationSpotLevel,
} from './assets/interfaces/interfaces';
import CardsSection from './components/cards';

const Result = styled.span`
	color: ${props => props.theme.color.main};
	text-align: center;
`;

const Main = styled.main`
	margin: ${props => props.theme.side_padding};
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

function App() {
	const [result, setResult] = useState(0);

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
		console.clear();
		const card = selectedCard;
		const actions = selectedActions;
		const constructions = selectedConstructions;

		// actives in constructions
		const isConstructing = Object.keys(constructions).filter(
			construction =>
				constructions[construction as ConstructionTypes] === true,
		) as ConstructionTypes[];
		if (isConstructing.length == 0) {
			console.log('empty constructions:', isConstructing);
			return;
		}

		// actives in actions
		const isExecuting = Object.keys(actions).filter(
			action => actions[action as ActionTypes] === true,
		) as ActionTypes[];
		if (isExecuting.length == 0) {
			console.log('empty constructions:', isExecuting);
			return;
		}
		// make result
		if (selectedCard == null) {
			alert('카드가 선택되지 않았습니다');
			return;
		}
		let total: number = 0;

		switch (card?.isVacationSpot) {
			case true:
				{
					isExecuting.forEach(action => {
						isConstructing.forEach(construction => {
							const costTable =
								card.cost as CostTable<VacationSpotLevel>;
							const value =
								costTable[construction as VacationSpotLevel][
									action
								];
							if (!value) {
								throw new Error(
									`value not matchs to cost table ${value}`,
								);
							}
							total += value;
						});
					});
				}
				break;
			case false:
				{
					isExecuting.forEach(action => {
						isConstructing.forEach(construction => {
							const costTable =
								card.cost as CostTable<NormalCityLevel>;
							const value =
								costTable[construction as NormalCityLevel][
									action
								];
							if (!value) {
								throw new Error(
									`value not matchs to cost table ${value}`,
								);
							}
							total += value;
						});
					});
				}
				break;
		}
		setResult(total);
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
				<Result>{result}</Result>
			</Main>
		</>
	);
}

export default App;
