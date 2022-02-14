import React from 'react';
import styled from 'styled-components';
import {
	IsExecutingStates,
	UpdateSelectedActions,
} from '../assets/interfaces/interfaces';
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

type ActionProps = {
	actions: IsExecutingStates;
	updateSelectedActions: UpdateSelectedActions;
};

function SelectAction({ updateSelectedActions, actions }: ActionProps) {
	const obj = {
		buy: false,
		pay: false,
		takeOver: false,
		sell: false,
	};

	// 버튼 눌렀을 때
	// action이 true이면, action => false
	// action이 false이면, action => true
	return (
		<Container>
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
						updateSelectedActions('buy');
					}}
				></ButtonComponent>
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
						updateSelectedActions('pay');
					}}
				></ButtonComponent>
			)}

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
						updateSelectedActions('takeOver');
					}}
				></ButtonComponent>
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
						updateSelectedActions('sell');
					}}
				></ButtonComponent>
			)}
		</Container>
	);
}

export default SelectAction;
