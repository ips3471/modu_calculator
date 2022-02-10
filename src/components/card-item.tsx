import React from 'react';
import styled from 'styled-components';
import { Card } from './cards';

const Container = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.6rem;
	font-size: 1.8em;
	padding: 0.3rem 0;
`;
const Control = styled.div`
	display: flex;
	align-items: center;
`;
const Title = styled.span`
	font-weight: 600;
`;

type CardItemProps = {
	card: Card;
};

function CardItem({ card }: CardItemProps) {
	const { name } = card;

	return (
		<Container>
			<Title>{name}</Title>
			<Control></Control>
		</Container>
	);
}

export default CardItem;
