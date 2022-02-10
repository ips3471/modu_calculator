import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	flex: 1 0 4rem;
	background-color: transparent;
`;
const Icon = styled.span`
	font-size: 1.5em;
`;
const Name = styled.span`
	font-size: 0.7em;
`;

type ButtonProps = {
	icon: any;
	name: string;
	callback: (param?: any) => any;
};

function ButtonComponent({ icon, name, callback }: ButtonProps) {
	return (
		<Button onClick={() => callback()}>
			<Icon>{icon}</Icon>
			<Name>{name}</Name>
		</Button>
	);
}

export default ButtonComponent;
