import React from 'react';
import styled from 'styled-components';
import { createFalse } from 'typescript';
import ButtonComponent from './button';
import { Card } from './cards';

const Container = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.land {
		opacity: 0.6;
	}
	.villa {
		opacity: 0.6;
	}
	.building {
		opacity: 0.6;
	}
	.hotel {
		opacity: 0.6;
	}
	.landmark {
		opacity: 0.6;
	}
	.flag {
		opacity: 0.6;
	}
	.parasol {
		opacity: 0.6;
	}
	.bangalore {
		opacity: 0.6;
	}
`;

type ConstructionProps = {
	city: Card | null;
};

function Construction({ city }: ConstructionProps) {
	function sortVacationSpot(city: Card | null): boolean {
		if (!city || city.isVacationSpot === false) {
			return false;
		} else {
			return true;
		}
	}
	const isVacationSpot = sortVacationSpot(city);
	return (
		<Container>
			{isVacationSpot ? (
				<>
					<ButtonComponent
						className={'flag'}
						icon={<i className='fas fa-flag'></i>}
						name='땅'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
					<ButtonComponent
						className={'parasol'}
						icon={<i className='fas fa-archway'></i>}
						name='파라솔'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
					<ButtonComponent
						className={'bangalore'}
						icon={<i className='fas fa-landmark'></i>}
						name='방갈로'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
				</>
			) : (
				<>
					<ButtonComponent
						className={'land'}
						icon={<i className='fas fa-flag'></i>}
						name='땅'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
					<ButtonComponent
						className={'villa'}
						icon={<i className='fas fa-store'></i>}
						name='별장'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
					<ButtonComponent
						className={'building'}
						icon={<i className='fas fa-building'></i>}
						name='빌딩'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
					<ButtonComponent
						className={'hotel'}
						icon={<i className='fas fa-hotel'></i>}
						name='호텔'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
					<ButtonComponent
						className={'landmark'}
						icon={<i className='fas fa-mosque'></i>}
						name='랜드마크'
						callback={() => {
							console.log('buttonClick');
						}}
					></ButtonComponent>
				</>
			)}
		</Container>
	);
}

export default Construction;
