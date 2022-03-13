import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
	CardInfo,
	NormalCityNames,
	UpdatingState,
	VacationSpotNames,
} from '../assets/interfaces/interfaces';
import TouchEvent from '../utill/touch-event';

const bubbling = keyframes`
	0% {
		transform: scale(0.95);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(0.95);
	}
`;

const Card = styled.button<ICardItemStyleProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
	&:before {
		width: 100%;
		content: '${props => props.name}';
		display: inline-block;
		position: absolute;
		top: 0;
		color: ${props => props.theme.color.main};
		font-size: 0.8em;
		padding: 3px 0;
		background-color: #00000050;
		z-index: 5;
	}
	&:after {
		display: ${props => (props.isBelonged ? 'visible' : 'none')};
		width: 100%;
		content: 'check';
		background-color: greenyellow;
		position: absolute;
		bottom: 0;
		color: ${props => props.theme.color.main};
	}
	opacity: 0.6;
`;

const Image = styled.img.attrs(props => ({
	title: props.title || 'undefined',
}))`
	min-width: 120%;
	min-height: 120%;
	transform: scale(90%);
`;
const SelectedCard = styled(Card)`
	opacity: 1;
`;
const SelectedImage = styled(Image)`
	animation: ${bubbling} 2s linear infinite;
	border: 1px solid ${props => props.theme.color.background};
`;

interface ICardItemStyleProps {
	name: string;
	isBelonged: boolean;
}

type CardItemProps = {
	card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>;
	updateCard: UpdatingState<CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>>;
	selectedCard: CardInfo<NormalCityNames | VacationSpotNames> | null;
	displayDialog: UpdatingState<boolean>;
};

function CardItem({ card, updateCard, selectedCard, displayDialog }: CardItemProps) {
	const { name, src, id, belonged } = card;
	const isSelected: boolean = id === selectedCard?.id;
	const touchEvent = new TouchEvent(300);

	return (
		<>
			{isSelected ? (
				<SelectedCard
					isBelonged={belonged}
					name={name}
					onTouchStart={() => {
						touchEvent.touchStart(displayDialog);
					}}
					onTouchEnd={() => touchEvent.touchEnd()}
				>
					<SelectedImage src={src} alt={name} />
				</SelectedCard>
			) : (
				<Card
					isBelonged={belonged}
					name={name}
					onTouchStart={() => {
						touchEvent.touchStart(displayDialog);
					}}
					onTouchEnd={() => {
						touchEvent.touchEnd();
						updateCard(card);
					}}
				>
					<Image src={src} alt={name} />
				</Card>
			)}
		</>
	);
}

export default CardItem;
