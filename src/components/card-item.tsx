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
		display: block;
		width: 100%;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		content: '';
		height: 1rem;
		background-color: ${props =>
			props.color === 'green'
				? props.theme.color.card_label.line1_first
				: props.color === 'dark-green'
				? props.theme.color.card_label.line1_second
				: props.color === 'blue'
				? props.theme.color.card_label.line2_first
				: props.color === 'dark-blue'
				? props.theme.color.card_label.line2_second
				: props.color === 'pink'
				? props.theme.color.card_label.line3_first
				: props.color === 'purple'
				? props.theme.color.card_label.line3_second
				: props.color === 'orange'
				? props.theme.color.card_label.line4_first
				: props.color === 'red'
				? props.theme.color.card_label.line4_second
				: props.color === 'light-blue'
				? props.theme.color.card_label.island1
				: props.color === 'light-pink'
				? props.theme.color.card_label.island2
				: ''};
		position: absolute;
		transform: ${props => (props.isBelonged ? 'translateY(-2rem)' : '')};
		bottom: -2rem;
		transition: transform 250ms ease-out;
		color: ${props => props.theme.color.main};
		opacity: 1;
	}
	& > img {
		min-width: 120%;
		min-height: 120%;
		transform: scale(90%);
	}
	& > img.active {
		animation: ${bubbling} 2s linear infinite;
	}
	& > ul {
		text-align: right;
		position: absolute;
		top: 1.5rem;
		right: 0;
		z-index: 10;
		font-size: 1em;
	}
	& > ul > li {
		opacity: 0.8;
	}
	& > ul > li.olympic {
		letter-spacing: -0.9rem;
		margin-right: 0.9rem;
	}

	opacity: ${props => (props.isSelected ? '1' : '0.6')};
`;

interface ICardItemStyleProps {
	name: string;
	isBelonged: boolean;
	isSelected: boolean;
	color: string;
}

type CardItemProps = {
	card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>;
	updateCard: UpdatingState<CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>>;
	selectedCard: CardInfo<NormalCityNames | VacationSpotNames> | null;
	displayDialog: UpdatingState<boolean>;
};

function CardItem({ card, updateCard, selectedCard, displayDialog }: CardItemProps) {
	const { name, src, id, belonged, color, isFestival, olympicPhase } = card;
	const isSelected: boolean = id === selectedCard?.id;
	const touchEvent = new TouchEvent();

	return (
		<Card
			color={color}
			isBelonged={belonged}
			isSelected={isSelected}
			name={name}
			onTouchStart={() => {
				touchEvent.touchStart(displayDialog);
			}}
			onTouchEnd={() => {
				touchEvent.touchEnd();
				!isSelected && updateCard(card);
			}}
		>
			<ul>
				<li className='olympic'>{'🏆'.repeat(olympicPhase)}</li>
				<li>{isFestival ? '🎀' : ''}</li>
			</ul>
			<img className={isSelected ? 'active' : ''} src={src} alt={name} />
		</Card>
	);
}

export default CardItem;
