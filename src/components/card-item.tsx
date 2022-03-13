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

const Card = styled.button.attrs(props => ({
	title: props.title || 'undefined',
}))`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
	&:before {
		width: 100%;
		content: '${props => props.title}';
		display: inline-block;
		position: absolute;
		top: 0;
		color: ${props => props.theme.color.main};
		font-size: 0.8em;
		padding: 3px 0;
		background-color: #00000050;
		z-index: 5;
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

type CardItemProps = {
	card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>;
	updateCard: UpdatingState<CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>>;
	selectedCard: CardInfo<NormalCityNames | VacationSpotNames> | null;
	displayDialog: UpdatingState<boolean>;
};

function CardItem({ card, updateCard, selectedCard, displayDialog }: CardItemProps) {
	const { name, src, id } = card;
	const isSelected: boolean = id === selectedCard?.id;
	const touchEvent = new TouchEvent(300);

	return (
		<>
			{isSelected ? (
				<SelectedCard title={name}>
					<SelectedImage src={src} alt={name} />
				</SelectedCard>
			) : (
				<Card
					title={name}
					onTouchStart={() => {
						touchEvent.touchStart(displayDialog);
						updateCard(card);
					}}
					onTouchEnd={() => touchEvent.touchEnd()}
				>
					<Image src={src} alt={name} />
				</Card>
			)}
		</>
	);
}

export default CardItem;
