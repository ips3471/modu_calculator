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
import CardDialog from './components/dialogs/card-dialog';

const AppWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Main = styled.main<AppStyleProps>`
	margin: ${props => props.theme.side_padding};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1;
	opacity: ${props => (props.dialog ? 0.7 : 1)};
	filter: ${props => (props.dialog ? 'blur(2px)' : null)};
	pointer-events: ${props => (props.dialog ? 'none' : 'all')};
`;

const Result = styled.div`
	color: ${props => props.theme.color.main};
	width: 100%;
	height: 4rem;
	font-size: 1.5em;
	line-height: 4rem;
	text-align: center;
`;

type AppStyleProps = {
	dialog: boolean;
};

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

	const [dialog, setDialog] = useState<boolean>(false);

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
			if (action === 'pay' && selectedCard.isFestival === true) {
				total *= 2;
			}
			if (action === 'pay' && selectedCard.olympicPhase >= 1) {
				total *= selectedCard.olympicPhase + 1;
			}
		});

		setResult(total);
	}, [selectedConstructions, selectedActions, cardsPresenter.changeOlympicPhase]);

	return (
		<AppWrapper>
			<Header />
			<Main dialog={dialog}>
				<CardsSection
					updateCard={updateSelectedCard}
					cardsPresenter={cardsPresenter}
					displayDialog={setDialog}
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
				<Result>
					{result}
					{selectedCard?.isFestival && '🎀'}
					{selectedCard?.olympicPhase ? '🏆' : ''}
				</Result>
			</Main>
			{dialog && (
				<CardDialog
					setDialog={setDialog}
					displayDialog={setDialog}
					title={cardsPresenter.getCard()?.name}
					cardsPresenter={cardsPresenter}
				/>
			)}
		</AppWrapper>
	);
}

export default App;
