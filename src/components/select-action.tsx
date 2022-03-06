import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import {
	ActionTypes,
	ExecutingStates,
	WholeConstructionTypes,
} from '../assets/interfaces/interfaces';
import ButtonComponent from './button';

const Container = styled.ul`
	display: flex;
	align-items: center;
	flex-grow: 1 0 5rem;
	justify-content: space-between;
	.true {
		opacity: 1;
	}
	.false {
		opacity: 0.6;
	}
	.hide {
		visibility: hidden;
	}
`;

type ActionProps = {
	actionsDisabler: (
		parent: ExecutingStates<ActionTypes>,
		setState: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		...states: ActionTypes[]
	) => void;
	constructions: ExecutingStates<WholeConstructionTypes>;
	actions: ExecutingStates<ActionTypes>;
	setAction: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>;
	statesSwitch: (
		setState: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		state: ActionTypes,
	) => void;
};

function SelectAction({
	actionsDisabler,
	actions,
	constructions,
	setAction,
	statesSwitch,
}: ActionProps) {
	function prohibitBuy(): boolean {
		return isActionWithLandmark() || prohibitAction('parasol', 'bangalore');
	}
	function prohibitTakeOver(): boolean {
		return (
			constructions['landmark'] ||
			prohibitAction('parasol', 'bangalore', 'flag')
		);
	}
	function isActionWithLandmark() {
		return (
			constructions['landmark'] &&
			Object.values(constructions).filter(value => value === true)
				.length > 1
		);
	}
	function prohibitAction(...items: WholeConstructionTypes[]) {
		return items.some(item => constructions[item] === true);
	}

	return (
		<Container>
			{prohibitBuy() ? (
				<ButtonComponent
					className={'hide'}
					icon={<i className='fas fa-circle-play'></i>}
					name='구매'
					callback={() => {}}
				></ButtonComponent>
			) : (
				<>
					{actions['buy'] ? (
						<ButtonComponent
							className={'true'}
							icon={<i className='fas fa-circle-play'></i>}
							name='구매'
							callback={() => {
								statesSwitch(setAction, 'buy');
							}}
						></ButtonComponent>
					) : (
						<ButtonComponent
							className={'false'}
							icon={<i className='fas fa-circle-play'></i>}
							name='구매'
							callback={() => {
								actionsDisabler(
									actions,
									setAction,
									'pay',
									'sell',
									'takeOver',
								);
								statesSwitch(setAction, 'buy');
							}}
						></ButtonComponent>
					)}
				</>
			)}

			{actions['pay'] ? (
				<ButtonComponent
					className={'true'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {
						statesSwitch(setAction, 'pay');
					}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'false'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {
						actionsDisabler(actions, setAction, 'buy', 'sell');
						statesSwitch(setAction, 'pay');
					}}
				></ButtonComponent>
			)}

			{prohibitTakeOver() ? (
				<ButtonComponent
					className={'hide'}
					icon={<i className='fas fa-circle-dot'></i>}
					name='인수'
					callback={() => {}}
				></ButtonComponent>
			) : (
				<>
					{actions['takeOver'] ? (
						<ButtonComponent
							className={'true'}
							icon={<i className='fas fa-circle-dot'></i>}
							name='인수'
							callback={() => {
								statesSwitch(setAction, 'takeOver');
							}}
						></ButtonComponent>
					) : (
						<ButtonComponent
							className={'false'}
							icon={<i className='fas fa-circle-dot'></i>}
							name='인수'
							callback={() => {
								actionsDisabler(
									actions,
									setAction,
									'buy',
									'sell',
								);
								statesSwitch(setAction, 'takeOver');
							}}
						></ButtonComponent>
					)}
				</>
			)}

			{actions['sell'] ? (
				<ButtonComponent
					className={'true'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {
						statesSwitch(setAction, 'sell');
					}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'false'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {
						actionsDisabler(
							actions,
							setAction,
							'buy',
							'takeOver',
							'pay',
						);
						statesSwitch(setAction, 'sell');
					}}
				></ButtonComponent>
			)}
		</Container>
	);
}

export default SelectAction;
