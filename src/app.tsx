import React, { useEffect, SetStateAction } from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import SelectConstructions from './components/select-constructions/select-constructions';
import SelectAction from './components/select-action';
import {
	ActionTypes,
	Card,
	ExecutingStates,
	WholeConstructionTypes,
} from './assets/interfaces/interfaces';
import CardsSection from './components/cards';
import ConstructionsPresenter from './presenter/constructions/constructions';
import ActionsPresenter from './presenter/actions/actions';

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
	actionsPresenter: ActionsPresenter;
};

function App({ constructionsPresenter, actionsPresenter }: AppProps) {
	const [result, setResult] = useState(0);

	const [selectedCard, setSelectedCard] = useState<Card | null>(null);

	const [selectedConstructions, setSelectedConstructions] = useState<
		ExecutingStates<WholeConstructionTypes>
	>(constructionsPresenter.getAll());

	const [selectedActions, setSelectedActions] = useState<
		ExecutingStates<ActionTypes>
	>(actionsPresenter.getAll());

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
		setState: React.Dispatch<SetStateAction<ExecutingStates<T>>>,
		state: T,
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
		selectedCard &&
			console.log(`${selectedCard.name}이(가) 선택되었습니다`);
	}, [selectedCard]);

	useEffect(() => {
		const selected = constructionsPresenter.getTrues();
		console.log(`선택된 건설옵션은 ${selected}입니다`);
	}, [selectedConstructions]);

	useEffect(() => {
		constructionsPresenter.resetAll(setSelectedConstructions);
		actionsPresenter.resetAll(setSelectedActions);
	}, [selectedCard]);

	useEffect(() => {
		let total: number = 0;
		const isConstructing = constructionsPresenter.getTrues();
		const isExecuting = actionsPresenter.getTrues();

		if (
			isConstructing.length === 0 ||
			isExecuting.length === 0 ||
			selectedCard === null
		) {
			setResult(0);
			return;
		}

		let value = 0;
		isExecuting.forEach(action => {
			isConstructing.forEach(construction => {
				try {
					value =
						selectedCard.cost[
							construction as keyof typeof selectedCard.cost
						][action];
				} catch {
					console.error(
						`card:${selectedCard}, construction:${construction}, action:${action}`,
					);
					actionsPresenter.resetAll(setSelectedActions);
					constructionsPresenter.resetAll(setSelectedConstructions);
					alert('알 수 없는 이유로 모든 옵션이 초기화되었습니다');
				} finally {
					console.log(value);
					if (value == undefined) {
						value = 0;
						actionsPresenter.resetAll(setSelectedActions);
					}
					total += value;
				}
			});
		});

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
					actionsPresenter={actionsPresenter}
					constructionsPresenter={constructionsPresenter}
				/>
				<Result>{result}</Result>
			</Main>
		</AppWrapper>
	);
}

export default App;
