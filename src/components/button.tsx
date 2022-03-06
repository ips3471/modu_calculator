import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	flex: 1 0 1rem;
	background-color: transparent;
	color: ${props => props.theme.color.main};
`;
const Icon = styled.span`
	font-size: 1.5em;
`;
const Name = styled.span`
	font-size: 0.5em;
	white-space: nowrap;
`;

type ButtonProps = {
	icon: any;
	name: string;
	callback: (param?: any) => any;
	className?: 'true' | 'false' | 'hide';
};

function ButtonComponent({ icon, name, callback, className }: ButtonProps) {
	return (
		<Button className={className} onClick={() => callback()}>
			<Icon>{icon}</Icon>
			<Name>{name}</Name>
		</Button>
	);
}

export default ButtonComponent;
