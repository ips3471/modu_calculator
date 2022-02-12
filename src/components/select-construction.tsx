import React from 'react';
import styled from 'styled-components';
import { ConstructionStates, GeneralCost } from '../app';
import ButtonComponent from './button';
import { Card } from './cards';

const Container = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.on {
		opacity: 1;
	}
	.off {
		opacity: 0.6;
	}
`;

type ConstructionProps = {
	city: Card | null;
	updateConstructionStates: (constructionName: keyof GeneralCost) => void;
	constructionStates: ConstructionStates<GeneralCost>;
};

function SelectConstruction({
	city,
	updateConstructionStates,
	constructionStates,
}: ConstructionProps) {
	function sortVacationSpot(city: Card | null): boolean {
		if (!city || city.isVacationSpot === false) {
			return false;
		} else {
			return true;
		}
	}
	const isVacationSpot = sortVacationSpot(city);
	console.log(constructionStates['flag']);

	return (
		<Container>
			{isVacationSpot ? (
				<>
					{constructionStates['flag'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructionStates('flag');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructionStates('flag');
							}}
						/>
					)}
					{constructionStates['parasol'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								updateConstructionStates('parasol');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								updateConstructionStates('parasol');
							}}
						/>
					)}
					{constructionStates['bangalore'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								updateConstructionStates('bangalore');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								updateConstructionStates('bangalore');
							}}
						/>
					)}
				</>
			) : (
				<>
					{constructionStates['land'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructionStates('land');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructionStates('land');
							}}
						/>
					)}
					{constructionStates['villa'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								updateConstructionStates('villa');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								updateConstructionStates('villa');
							}}
						/>
					)}
					{constructionStates['building'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								updateConstructionStates('building');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								updateConstructionStates('building');
							}}
						/>
					)}
					{constructionStates['hotel'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								updateConstructionStates('hotel');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								updateConstructionStates('hotel');
							}}
						/>
					)}
					{constructionStates['landmark'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								updateConstructionStates('landmark');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								updateConstructionStates('landmark');
							}}
						/>
					)}
				</>
			)}
		</Container>
	);
}

export default SelectConstruction;
