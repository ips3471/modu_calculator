import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import {
	Card,
	WholeConstructionTypes,
	ExecutingStates,
	ActionTypes,
	UpdatingState,
} from '../assets/interfaces/interfaces';
import { sortVacationSpot } from '../utill/utill';
import ButtonComponent from './button';

const Container = styled.ul`
	display: flex;
	flex: 1 0 5rem;
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
	constructions: ExecutingStates<WholeConstructionTypes>;
	updateActions: UpdatingState<ActionTypes>;
	actions: ExecutingStates<ActionTypes>;
	setState: React.Dispatch<
		SetStateAction<ExecutingStates<WholeConstructionTypes>>
	>;
	statesSwitch: (
		setState: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
		state: WholeConstructionTypes,
	) => void;
};

function SelectConstruction({
	card,
	updateActions,
	constructions,
	actions,
	setState,
	statesSwitch,
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
								statesSwitch(setState, 'flag');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								statesSwitch(setState, 'flag');
							}}
						/>
					)}
					{constructions['parasol'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								statesSwitch(setState, 'parasol');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								statesSwitch(setState, 'parasol');
							}}
						/>
					)}
					{constructions['bangalore'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								statesSwitch(setState, 'bangalore');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								statesSwitch(setState, 'bangalore');
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
								statesSwitch(setState, 'land');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								statesSwitch(setState, 'land');
							}}
						/>
					)}
					{constructions['villa'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								statesSwitch(setState, 'villa');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								statesSwitch(setState, 'villa');
							}}
						/>
					)}
					{constructions['building'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								statesSwitch(setState, 'building');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								statesSwitch(setState, 'building');
							}}
						/>
					)}
					{constructions['hotel'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								statesSwitch(setState, 'hotel');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								statesSwitch(setState, 'hotel');
							}}
						/>
					)}
					{constructions['landmark'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								statesSwitch(setState, 'landmark');
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
								statesSwitch(setState, 'landmark');
							}}
						/>
					)}
				</>
			)}
		</Container>
	);
}

export default SelectConstruction;
