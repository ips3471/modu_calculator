import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.header`
	/* height: 2em; */
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 0.6em;
	background-color: #ffffff20;
	height: 4em;
	padding: 0.6em;

	> .title {
		color: ${props => props.theme.color.main};
	}

	> .hint {
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
	}
`;

type HeaderProps = {
	setHintDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ setHintDialog }: HeaderProps) {
	return (
		<Container>
			<h1 className='title'>Modu Calculator</h1>
			<button className='hint' onClick={() => setHintDialog(true)}>
				<i className='fas fa-question'></i>
			</button>
		</Container>
	);
}

export default Header;
