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
	padding: 3px;
	background-color: #00000050;
	font-weight: 600;
	font-size: 0.6em;
`;

type CardItemProps = {
	card: Card;
};

function CardItem({ card }: CardItemProps) {
	const { name, src } = card;

	const onCardClick = () => {
		console.log('onCardClick');
	};

	return (
		<Container>
			<CardSection
				onClick={() => {
					onCardClick();
				}}
				defaultValue={src}
			>
				<Title>{name}</Title>
			</CardSection>
		</Container>
	);
}

export default CardItem;