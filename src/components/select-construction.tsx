import React from 'react';
import styled from 'styled-components';
import {
	Card,
	IsConstructingStates,
	IsExecutingStates,
	UpdateSelectedActions,
	UpdateSelectedConstructions,
} from '../assets/interfaces/interfaces';
import { sortVacationSpot } from '../utill/utill';
import ButtonComponent from './button';

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
	card: Card | null;
	constructions: IsConstructingStates;
	updateConstructions: UpdateSelectedConstructions;
	updateActions: UpdateSelectedActions;
	actions: IsExecutingStates;
};

function SelectConstruction({
	card,
	updateConstructions,
	updateActions,
	constructions,
	actions,
}: ConstructionProps) {
	const isVacationSpot = sortVacationSpot(card);

	return (
		<Container>
			{isVacationSpot ? (
				<>
					{constructions['flag'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructions('flag');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructions('flag');
							}}
						/>
					)}
					{constructions['parasol'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								updateConstructions('parasol');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								updateConstructions('parasol');
							}}
						/>
					)}
					{constructions['bangalore'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								updateConstructions('bangalore');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								updateConstructions('bangalore');
							}}
						/>
					)}
				</>
			) : (
				<>
					{constructions['land'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructions('land');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								updateConstructions('land');
							}}
						/>
					)}
					{constructions['villa'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								updateConstructions('villa');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								updateConstructions('villa');
							}}
						/>
					)}
					{constructions['building'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								updateConstructions('building');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								updateConstructions('building');
							}}
						/>
					)}
					{constructions['hotel'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								updateConstructions('hotel');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								updateConstructions('hotel');
							}}
						/>
					)}
					{constructions['landmark'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								updateConstructions('landmark');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								if (actions['takeOver']) {
									updateActions('takeOver');
								}
								updateConstructions('landmark');
							}}
						/>
					)}
				</>
			)}
		</Container>
	);
}

export default SelectConstruction;
