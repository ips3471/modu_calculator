import React from 'react';
import CardItem from './card-item';
import styled from 'styled-components';
import {
	UpdatingState,
	NormalCityNames,
	VacationSpotNames,
	CardInfo,
	CardNames,
} from '../assets/interfaces/interfaces';
import CardsPresenter from '../presenter/cards/cards';

const Container = styled.ul`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-auto-rows: calc((100vh - 15em) / 4);
	gap: 3px;
	padding: 0;
`;

type CardsProps = {
	updateCard: UpdatingState<CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>>;
	cardsPresenter: CardsPresenter;
	displayDialog: UpdatingState<boolean>;
};

function CardsSection({ updateCard, cardsPresenter, displayDialog }: CardsProps) {
	const cards = cardsPresenter.getInfos();
	const ascendedCardNames = Object.keys(cards).sort(
		(a, b) => cards[a as keyof typeof cards].id - cards[b as keyof typeof cards].id,
	) as CardNames[];
	return (
		<Container>
			{ascendedCardNames.map(key => {
				const card = cards[key];
				const selectedCard = cardsPresenter.getCard();
				return (
					<CardItem
						selectedCard={selectedCard}
						updateCard={updateCard}
						key={card.id}
						card={card}
						displayDialog={displayDialog}
					/>
				);
			})}
		</Container>
	);
}

export default CardsSection;
