import React from 'react';
import styled from 'styled-components';
import {
	ActionTypes,
	IsConstructingStates,
	IsExecutingStates,
	UpdateSelectedActions,
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
	actions: IsExecutingStates;
	constructions: IsConstructingStates;
	updateSelectedActions: UpdateSelectedActions;
};

function SelectAction({
	updateSelectedActions,
	actions,
	constructions,
}: ActionProps) {
	function actionDisabler(...actionTypes: ActionTypes[]): void {
		actionTypes.forEach(actionType => {
			actions[actionType] && updateSelectedActions(actionType);
		});
	}

	return (
		<Container>
			{constructions['landmark'] &&
			Object.values(constructions).filter(value => value === true)
				.length > 1 ? (
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
								updateSelectedActions('buy');
							}}
						></ButtonComponent>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-circle-play'></i>}
							name='구매'
							callback={() => {
								actionDisabler('pay', 'sell', 'takeOver');
								updateSelectedActions('buy');
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
						updateSelectedActions('pay');
					}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {
						actionDisabler('buy', 'sell');
						updateSelectedActions('pay');
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
								updateSelectedActions('takeOver');
							}}
						></ButtonComponent>
					) : (
						<ButtonComponent
							className={'off'}
							icon={<i className='fas fa-circle-dot'></i>}
							name='인수'
							callback={() => {
								actionDisabler('buy', 'sell');
								updateSelectedActions('takeOver');
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
						updateSelectedActions('sell');
					}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {
						actionDisabler('pay', 'buy', 'takeOver');
						updateSelectedActions('sell');
					}}
				></ButtonComponent>
			)}
		</Container>
	);
}

export default SelectAction;
