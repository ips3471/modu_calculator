import React, { useEffect, SetStateAction } from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import SelectConstructions from './components/select-constructions/select-constructions';
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
import ConstructionsPresenter from './presenter/constructions/constructions';

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

type AppProps = {
	constructionsPresenter: ConstructionsPresenter;
};

function App({ constructionsPresenter }: AppProps) {
	const [result, setResult] = useState(0);

	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	const [selectedConstructions, setSelectedConstructions] = useState<
		ExecutingStates<WholeConstructionTypes>
	>(constructionsPresenter.getAll());

	const [selectedActions, setSelectedActions] = useState<
		ExecutingStates<ActionTypes>
	>({
		buy: false,
		pay: false,
		takeOver: false,
		sell: false,
	});

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
						[state]: !current[state],
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
		// console.log(selectedCard?.name);
		selectedCard &&
			console.log(`${selectedCard.name}이(가) 선택되었습니다`);
	}, [selectedCard]);

	useEffect(() => {
		const selected = constructionsPresenter.getTrues();
		console.log(`선택된 건설옵션은 ${selected}입니다`);
	}, [selectedConstructions]);

	useEffect(() => {
		setResult(0);
		constructionsPresenter.resetAll(setSelectedConstructions);

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
		const isConstructing = constructionsPresenter.getTrues();
		if (isConstructing.length == 0) {
			setResult(0);
			console.log('empty constructions:', isConstructing);
			return;
		}

		// actives in actions
		const isExecuting = Object.keys(actions).filter(
			action => actions[action as ActionTypes] === true,
		) as ActionTypes[];
		if (isExecuting.length == 0) {
			setResult(0);
			console.log('empty constructions:', isExecuting);
			return;
		}
		// make result
		if (selectedCard == null) {
			setResult(0);
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
				<SelectConstructions
					card={selectedCard}
					constructions={selectedConstructions}
					setConstruction={setSelectedConstructions}
					constructionsPresenter={constructionsPresenter}
				/>
				<SelectAction
					actions={selectedActions}
					constructions={selectedConstructions}
					actionsDisabler={statesDisabler}
					setAction={setSelectedActions}
					statesSwitch={statesSwitch}
				/>
				<Result>{result}</Result>
			</Main>
		</AppWrapper>
	);
}

export default App;
