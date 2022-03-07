import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import {
	ActionTypes,
	ExecutingStates,
	WholeConstructionTypes,
} from '../assets/interfaces/interfaces';
import ActionsPresenter from '../presenter/actions/actions';
import ConstructionsPresenter from '../presenter/constructions/constructions';
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
	actionsPresenter: ActionsPresenter;
	constructionsPresenter: ConstructionsPresenter;
};

type ActionIcon = 'circle-play' | 'circle-pause' | 'circle-dot' | 'circle-stop';
type ActionName = '구매' | '지불' | '인수' | '매각';

function SelectAction({
	actions,
	constructions,
	setAction,
	actionsPresenter,
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

	function renderButtonComponent(
		iconId: ActionIcon,
		dataName: ActionTypes,
		displayName: ActionName,
		isHide?: boolean,
	) {
		const isSelectedToString = isHide
			? 'hide'
			: (actions[dataName].toString() as 'true' | 'false');

		function callbackSelector() {
			if (
				(!actions[dataName] && dataName === 'buy') ||
				dataName === 'sell'
			) {
				return actionsPresenter.disableStatesExcept(
					dataName,
					setAction,
				);
			} else if (
				(!actions[dataName] && dataName === 'pay') ||
				dataName === 'takeOver'
			) {
				return actionsPresenter.disableStatesExcept(
					dataName,
					setAction,
					'buy',
					'sell',
				);
			}
		}
		return (
			<ButtonComponent
				className={isSelectedToString}
				icon={<i className={'fas fa-' + iconId}></i>}
				name={displayName}
				callback={() => callbackSelector()}
			/>
		);
	}

	return (
		<Container>
			{prohibitBuy()
				? renderButtonComponent('circle-play', 'buy', '구매', true)
				: renderButtonComponent('circle-play', 'buy', '구매')}
			{renderButtonComponent('circle-pause', 'pay', '지불')}
			{prohibitTakeOver()
				? renderButtonComponent('circle-dot', 'takeOver', '인수', true)
				: renderButtonComponent('circle-dot', 'takeOver', '인수')}
			{renderButtonComponent('circle-stop', 'sell', '매각')}
		</Container>
	);
}

export default SelectAction;
