import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1em;
	background-color: #ffffff20;
	padding: ${props => props.theme.side_padding};
	gap: 0.6rem;
`;
const Title = styled.h1`
	display: inline-block;
	color: ${props => props.theme.color.main};
`;
const Hint = styled.span`
	display: inline-block;
	width: 2em;
	height: 2em;
	line-height: 2em;
	text-align: center;
	color: ${props => props.theme.color.main};
	background-color: #000;
	border-radius: 50%;
	font-size: 1.2em;
	font-weight: 600;
`;

type HeaderProps = {};

function Header({}: HeaderProps) {
	return (
		<Container>
			<Title>Modu Calculator</Title>
			<Hint>
				<i className='fas fa-question'></i>
			</Hint>
		</Container>
	);
}

export default Header;
