import React from 'react';
import styled from 'styled-components';
import { Card } from './cards';

const Container = styled.li`
	display: contents;
	text-align: center;
`;

const CardSection = styled.section`
	background: url(${props => props.defaultValue}) center/cover no-repeat;
`;
const Title = styled.h2`
	color: ${props => props.theme.color.main};
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
	console.log(src);

	return (
		<Container>
			<CardSection defaultValue={src}>
				<Title>{name}</Title>
			</CardSection>
		</Container>
	);
}

export default CardItem;
