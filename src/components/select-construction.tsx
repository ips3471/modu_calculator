import React from 'react';
import styled from 'styled-components';
import ButtonComponent from './button';

const Container = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 5rem;
`;

type ConstructionProps = {};

function Construction({}: ConstructionProps) {
	return (
		<Container>
			<ButtonComponent
				icon={<i className='fas fa-circle-play'></i>}
				name='구매'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-circle-pause'></i>}
				name='지불'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-circle-dot'></i>}
				name='인수'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-circle-stop'></i>}
				name='매각'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
		</Container>
	);
}

export default Construction;
