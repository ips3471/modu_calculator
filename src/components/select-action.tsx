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
	.on {
		opacity: 1;
	}
	.off {
		opacity: 0.6;
	}
	.hide {
		visibility: hidden;
	}
`;

type ActionProps = {
	statesDisabler: (
		parent: ExecutingStates<ActionTypes>,
		setState: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		...states: ActionTypes[]
	) => void;
	constructions: ExecutingStates<WholeConstructionTypes>;
	actions: ExecutingStates<ActionTypes>;
	setState: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>;
	statesSwitch: (
		setState: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		state: ActionTypes,
	) => void;
};

function SelectAction({
	statesDisabler,
	actions,
	constructions,
	setState,
	statesSwitch,
}: ActionProps) {
	// function actionDisabler(...actionTypes: ActionTypes[]): void {
	// 	actionTypes.forEach(actionType => {
	// 		actions[actionType] && updateSelectedActions(actionType);
	// 	});
	// }
	function handleHide(): boolean {
		return prohibitTakeOver() || prohibitBuy('parasol', 'bangalore');
	}
	function prohibitTakeOver() {
		return (
			constructions['landmark'] &&
			Object.values(constructions).filter(value => value === true)
				.length > 1
		);
	}
	function prohibitBuy(...items: WholeConstructionTypes[]) {
		return items.some(item => constructions[item] === true);
	}

	return (
		<Container>
			{handleHide() ? (
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
							className={'on'}
							icon={<i className='fas fa-circle-play'></i>}
							name='구매'
							callback={() => {
								statesSwitch(setState, 'buy');
							}}
						></ButtonComponent>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-circle-play'></i>}
							name='구매'
							callback={() => {
								statesDisabler(
									actions,
									setState,
									'pay',
									'sell',
									'takeOver',
								);
								statesSwitch(setState, 'buy');
							}}
						></ButtonComponent>
					)}
				</>
			)}

			{actions['pay'] ? (
				<ButtonComponent
					className={'on'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {
						statesSwitch(setState, 'pay');
					}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {
						statesDisabler(actions, setState, 'buy', 'sell');
						statesSwitch(setState, 'pay');
					}}
				></ButtonComponent>
			)}

			{constructions['landmark'] ? (
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
							className={'on'}
							icon={<i className='fas fa-circle-dot'></i>}
							name='인수'
							callback={() => {
								statesSwitch(setState, 'takeOver');
							}}
						></ButtonComponent>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-circle-dot'></i>}
							name='인수'
							callback={() => {
								statesDisabler(
									actions,
									setState,
									'buy',
									'sell',
								);
								statesSwitch(setState, 'takeOver');
							}}
						></ButtonComponent>
					)}
				</>
			)}

			{actions['sell'] ? (
				<ButtonComponent
					className={'on'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {
						statesSwitch(setState, 'sell');
					}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {
						statesDisabler(
							actions,
							setState,
							'buy',
							'takeOver',
							'pay',
						);
						statesSwitch(setState, 'sell');
					}}
				></ButtonComponent>
			)}
		</Container>
	);
}

export default SelectAction;
