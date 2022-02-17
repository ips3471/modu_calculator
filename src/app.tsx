import React, { useEffect, SetStateAction } from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import SelectConstruction from './components/select-construction';
import SelectAction from './components/select-action';
import {
	ActionTypes,
	Card,
	CostTable,
	ExecutingStates,
	NormalCityLevel,
	VacationSpotLevel,
	WholeConstructionTypes,
} from './assets/interfaces/interfaces';
import CardsSection from './components/cards';

const AppWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const Main = styled.main`
	margin: ${props => props.theme.side_padding};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
`;

const Result = styled.div`
	color: ${props => props.theme.color.main};
	width: 100%;
	height: 4rem;
	font-size: 1.5em;
	line-height: 4rem;
	text-align: center;
`;

function App() {
	const [result, setResult] = useState(0);

	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	const [selectedConstructions, setSelectedConstructions] = useState<
		ExecutingStates<WholeConstructionTypes>
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

	const [selectedActions, setSelectedActions] = useState<
		ExecutingStates<ActionTypes>
	>({
		buy: false,
		pay: false,
		takeOver: false,
		sell: false,
	});

	const updateSelectedConstructions = (type: WholeConstructionTypes) => {
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

	function statesDisabler<T extends ActionTypes | WholeConstructionTypes>(
		parent: ExecutingStates<T>,
		setState: React.Dispatch<SetStateAction<ExecutingStates<T>>>,
		...states: T[]
	): void {
		states.forEach(state => {
			if (parent[state]) {
				setState(current => {
					return {
						...current,
						state: !current[state],
					};
				});
			}
		});
	}

	function statesSwitch<T extends ActionTypes | WholeConstructionTypes>(
		setState: React.Dispatch<SetStateAction<ExecutingStates<T>>>, // {} => {}
		state: T, // 'buy'
	): void {
		setState(current => {
			const states = { ...current };
			states[state] = !current[state];
			return states;
		});
	}

	const updateSelectedCard = (card: Card) => {
		setSelectedCard(card);
	};

	useEffect(() => {
		console.log(selectedCard?.name);
	}, [selectedCard]);

	useEffect(() => {
		setResult(0);
		setSelectedConstructions(current => {
			const states = { ...current };
			Object.keys(states).forEach(item => {
				states[item as keyof typeof states] = false;
			});
			return states;
		});
		setSelectedActions(current => {
			const states = { ...current };
			Object.keys(states).forEach(item => {
				states[item as keyof typeof states] = false;
			});
			return states;
		});
	}, [selectedCard]);

	useEffect(() => {
		const card = selectedCard;
		const actions = selectedActions;
		const constructions = selectedConstructions;

		// actives in constructions
		const isConstructing = Object.keys(constructions).filter(
			construction =>
				constructions[construction as WholeConstructionTypes] === true,
		) as WholeConstructionTypes[];
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
							let value =
								costTable[construction as VacationSpotLevel][
									action
								];
							if (!value) {
								console.info(
									`value not matchs to cost table ${value}`,
								);
								value = 0;
								setSelectedConstructions(nomalCities => {
									const states = { ...nomalCities };
									states[construction] = false;
									return states;
								});
								setSelectedActions(actions => {
									const states = { ...actions };
									states[action] = false;
									return states;
								});
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
							let value =
								costTable[construction as NormalCityLevel][
									action
								];
							if (!value) {
								console.info(
									`value not matchs to cost table ${value}`,
								);
								value = 0;
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
		<AppWrapper>
			<Header />
			<Main>
				<CardsSection updateCard={updateSelectedCard} />
				<SelectConstruction
					card={selectedCard}
					actions={selectedActions}
					constructions={selectedConstructions}
					updateActions={updateSelectedActions}
					setState={setSelectedConstructions}
					statesSwitch={statesSwitch}
				/>
				<SelectAction
					actions={selectedActions}
					constructions={selectedConstructions}
					statesDisabler={statesDisabler}
					setState={setSelectedActions}
					statesSwitch={statesSwitch}
				/>
				<Result>{result}</Result>
			</Main>
		</AppWrapper>
	);
}

export default App;
