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
				icon={<i className='fas fa-flag'></i>}
				name='땅'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-store'></i>}
				name='별장'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-building'></i>}
				name='빌딩'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-hotel'></i>}
				name='호텔'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
			<ButtonComponent
				icon={<i className='fas fa-mosque'></i>}
				name='랜드마크'
				callback={() => {
					console.log('buttonClick');
				}}
			></ButtonComponent>
		</Container>
	);
}

export default Construction;
