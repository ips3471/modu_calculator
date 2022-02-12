import React from 'react';
import styled from 'styled-components';
import ButtonComponent from './button';
import { ActionForNormalCity, ActionForVacationSpot } from './cards';

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
	updateSelectedAction: (
		action: keyof ActionForNormalCity | keyof ActionForVacationSpot,
	) => void;
	selectedAction:
		| keyof ActionForNormalCity
		| keyof ActionForVacationSpot
		| null;
};

function Action({ updateSelectedAction, selectedAction }: ActionProps) {
	return (
		<Container>
			{selectedAction === 'buy' ? (
				<ButtonComponent
					className={'on'}
					icon={<i className='fas fa-circle-play'></i>}
					name='구매'
					callback={() => {}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-play'></i>}
					name='구매'
					callback={() => {
						updateSelectedAction('buy');
					}}
				></ButtonComponent>
			)}

			{selectedAction === 'pay' ? (
				<ButtonComponent
					className={'on'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-pause'></i>}
					name='지불'
					callback={() => {
						updateSelectedAction('pay');
					}}
				></ButtonComponent>
			)}

			{selectedAction === 'takeOver' ? (
				<ButtonComponent
					className={'on'}
					icon={<i className='fas fa-circle-dot'></i>}
					name='인수'
					callback={() => {}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-dot'></i>}
					name='인수'
					callback={() => {
						updateSelectedAction('takeOver');
					}}
				></ButtonComponent>
			)}

			{selectedAction === 'sell' ? (
				<ButtonComponent
					className={'on'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {}}
				></ButtonComponent>
			) : (
				<ButtonComponent
					className={'off'}
					icon={<i className='fas fa-circle-stop'></i>}
					name='매각'
					callback={() => {
						updateSelectedAction('sell');
					}}
				></ButtonComponent>
			)}
		</Container>
	);
}

export default Action;
