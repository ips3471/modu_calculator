import React from 'react';
import styled from 'styled-components';
import { Card } from './cards';

const Container = styled.li`
	display: contents;
	text-align: center;
`;

const CardSection = styled.button`
	background: url(${props => props.defaultValue}) center/cover no-repeat;
	display: flex;
	padding: 0;
`;
const Title = styled.h2`
	color: ${props => props.theme.color.main};
	flex-grow: 1;
	margin: 0;
	background-color: #00000050;
	font-weight: 500;
	font-size: 0.4em;
`;

type CardItemProps = {
	card: Card;
	updateCity: (city: Card) => void;
};

function CardItem({ card, updateCity }: CardItemProps) {
	const { name, src } = card;

	// const onCardClick = () => {
	// 	console.log('onCardClick');
	// };

	return (
		<Container>
			<CardSection
				onClick={() => {
					updateCity(card);
				}}
				defaultValue={src}
			>
				<Title>{name}</Title>
			</CardSection>
		</Container>
	);
}

export default CardItem;
