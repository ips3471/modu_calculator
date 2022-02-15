import React from 'react';
import styled from 'styled-components';
import { Card, UpdateSelectedCard } from '../assets/interfaces/interfaces';

// background: url(${props => props.defaultValue}) center/cover no-repeat;
const CardSection = styled.button.attrs(props => ({
	title: props.title || 'undefined',
}))`
	display: flex;
	flex-direction: column;
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
	}
`;

const Image = styled.img.attrs(props => ({
	title: props.title || 'undefined',
}))`
	width: 100%;
	height: 100%;
`;

type CardItemProps = {
	card: Card;
	updateCard: UpdateSelectedCard;
};

function CardItem({ card, updateCard }: CardItemProps) {
	const { name, src } = card;

	// const onCardClick = () => {
	// 	console.log('onCardClick');
	// };

	return (
		<CardSection
			title={name}
			onClick={() => {
				updateCard(card);
			}}
		>
			<Image className='image' src={src} alt={name} />
		</CardSection>
	);
}

export default CardItem;
