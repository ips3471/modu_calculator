import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import {
	Card,
	WholeConstructionTypes,
	ExecutingStates,
	ActionTypes,
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
	actions: ExecutingStates<ActionTypes>;
	setConstruction: React.Dispatch<
		SetStateAction<ExecutingStates<WholeConstructionTypes>>
	>;
	setAction: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>;
	stateSwitch: (
		setState: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
		state: WholeConstructionTypes,
	) => void;
	constructionsDisabler: (
		parent: ExecutingStates<WholeConstructionTypes>,
		setState: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
		...states: WholeConstructionTypes[]
	) => void;
	actionsDisabler: (
		parent: ExecutingStates<ActionTypes>,
		setState: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		...states: ActionTypes[]
	) => void;
};

function SelectConstruction({
	card,
	setAction,
	constructions,
	actions,
	setConstruction,
	stateSwitch,
	constructionsDisabler,
	actionsDisabler,
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
								stateSwitch(setConstruction, 'flag');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								stateSwitch(setConstruction, 'flag');
								constructionsDisabler(
									constructions,
									setConstruction,
									'parasol',
									'bangalore',
								);
							}}
						/>
					)}
					{constructions['parasol'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								stateSwitch(setConstruction, 'parasol');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-archway'></i>}
							name='파라솔'
							callback={() => {
								stateSwitch(setConstruction, 'parasol');
								constructionsDisabler(
									constructions,
									setConstruction,
									'flag',
									'bangalore',
								);
							}}
						/>
					)}
					{constructions['bangalore'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								stateSwitch(setConstruction, 'bangalore');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-landmark'></i>}
							name='방갈로'
							callback={() => {
								stateSwitch(setConstruction, 'bangalore');
								constructionsDisabler(
									constructions,
									setConstruction,
									'parasol',
									'flag',
								);
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
								stateSwitch(setConstruction, 'land');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-flag'></i>}
							name='땅'
							callback={() => {
								stateSwitch(setConstruction, 'land');
							}}
						/>
					)}
					{constructions['villa'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								stateSwitch(setConstruction, 'villa');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-store'></i>}
							name='별장'
							callback={() => {
								stateSwitch(setConstruction, 'villa');
							}}
						/>
					)}
					{constructions['building'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								stateSwitch(setConstruction, 'building');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-building'></i>}
							name='빌딩'
							callback={() => {
								stateSwitch(setConstruction, 'building');
							}}
						/>
					)}
					{constructions['hotel'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								stateSwitch(setConstruction, 'hotel');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-hotel'></i>}
							name='호텔'
							callback={() => {
								stateSwitch(setConstruction, 'hotel');
							}}
						/>
					)}
					{constructions['landmark'] ? (
						<ButtonComponent
							className={'on'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								stateSwitch(setConstruction, 'landmark');
							}}
						/>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-mosque'></i>}
							name='랜드마크'
							callback={() => {
								if (actions['takeOver']) {
									actionsDisabler(
										actions,
										setAction,
										'takeOver',
									);
								}
								stateSwitch(setConstruction, 'landmark');
							}}
						/>
					)}
				</>
			)}
		</Container>
	);
}

export default SelectConstruction;
