import React, { useState } from 'react';
import CardItem from './card-item';
import styled from 'styled-components';
import {
	UpdatingState,
	NormalCityNames,
	VacationSpotNames,
	Infos,
	CardInfo,
	CardNames,
} from '../assets/interfaces/interfaces';
import CardsPresenter from '../presenter/cards/cards';

const Container = styled.ul`
	display: grid;
	flex: 1 1 30rem;
	grid-template-columns: repeat(6, 1fr);
	gap: 3px;
	grid-auto-rows: 8em;
	padding: 0;
`;

type CardsProps = {
	updateCard: UpdatingState<CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>>;
	cardsPresenter: CardsPresenter;
};

function CardsSection({ updateCard, cardsPresenter }: CardsProps) {
	const [cards, setCards] = useState<Infos<NormalCityNames> & Infos<VacationSpotNames>>(
		cardsPresenter.getInfos(),
	);
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
					/>
				);
			})}
		</Container>
	);
}

export default CardsSection;
