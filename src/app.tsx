import React, { useEffect } from 'react';
import Header from './components/header';
import styled from 'styled-components';
import { useState } from 'react';
import SelectConstructions from './components/select-constructions/select-constructions';
import SelectAction from './components/select-action';
import {
	ActionOptions,
	CardInfo,
	ExecutingStates,
	NormalCityNames,
	VacationSpotNames,
	BuildOptions,
} from './assets/interfaces/interfaces';
import CardsSection from './components/cards';
import ConstructionsPresenter from './presenter/constructions/constructions';
import ActionsPresenter from './presenter/actions/actions';
import CardsPresenter from './presenter/cards/cards';

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
	cardsPresenter: CardsPresenter;
};

function App({ constructionsPresenter, actionsPresenter, cardsPresenter }: AppProps) {
	const [result, setResult] = useState(0);

	const [selectedCard, setSelectedCard] = useState<
		CardInfo<NormalCityNames> | CardInfo<VacationSpotNames> | null
	>(cardsPresenter.getCard());

	const [selectedConstructions, setSelectedConstructions] = useState<
		ExecutingStates<BuildOptions>
	>(constructionsPresenter.getAll());

	const [selectedActions, setSelectedActions] = useState<
		ExecutingStates<ActionOptions>
	>(actionsPresenter.getAll());

	const updateSelectedCard = (
		card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>,
	) => {
		cardsPresenter.updateCard(card, setSelectedCard);
	};

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

		const costTable = cardsPresenter.getCostTable(selectedCard);
		let value = 0;
		isExecuting.forEach(action => {
			isConstructing.forEach(construction => {
				try {
					value = costTable[construction as keyof typeof costTable][action];
				} catch {
					console.error(
						`card:${selectedCard}, construction:${construction}, action:${action}`,
					);
					actionsPresenter.resetAll(setSelectedActions);
					constructionsPresenter.resetAll(setSelectedConstructions);
					alert('알 수 없는 이유로 모든 옵션이 초기화되었습니다');
				} finally {
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
				<CardsSection
					updateCard={updateSelectedCard}
					cardsPresenter={cardsPresenter}
				/>
				<SelectConstructions
					card={selectedCard}
					constructions={selectedConstructions}
					setConstruction={setSelectedConstructions}
					constructionsPresenter={constructionsPresenter}
				/>
				<SelectAction
					actions={selectedActions}
					constructions={selectedConstructions}
					setAction={setSelectedActions}
					actionsPresenter={actionsPresenter}
				/>
				<Result>{result}</Result>
			</Main>
		</AppWrapper>
	);
}

export default App;
