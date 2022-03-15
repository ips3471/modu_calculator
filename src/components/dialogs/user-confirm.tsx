import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import {
	NormalCityNames,
	UpdatingState,
	VacationSpotNames,
	CardInfo,
} from '../../assets/interfaces/interfaces';
import CardsPresenter from '../../presenter/cards/cards';

const Container = styled.div`
	padding: 1rem 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	border-radius: 20px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 1rem;
	background-color: rgba(0, 0, 0, 0.5);
	p {
		color: ${props => props.theme.color.main};
	}
	p > .bonusType {
		font-weight: 500;
		text-decoration: underline;
	}
`;

const Title = styled.div`
	color: ${props => props.theme.color.main};
`;

const Submit = styled.div`
	width: 100%;
	white-space: nowrap;
	& > button {
		width: 40%;
		background-color: #ffffff20;
		border-radius: 20px;
		padding: 0.8em 1em;
		margin: 0 0.5em;
		color: ${props => props.theme.color.main};
	}
	& > button.true {
		color: green;
	}
`;

type UserConfirmDialogProps = {
	displayingUserConfirmDialog: UpdatingState<boolean>;
	title: NormalCityNames | VacationSpotNames | undefined;
	bonusType?: '올림픽' | '축제';
	cardsPresenter: CardsPresenter;
	card: CardInfo<VacationSpotNames> | CardInfo<NormalCityNames> | null;
	setDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserConfirmDialog({
	displayingUserConfirmDialog,
	title,
	bonusType,
	cardsPresenter,
	card,
	setDialog,
}: UserConfirmDialogProps) {
	const onConfirmClick = () => {
		if (!card) {
			throw new Error('No card passed');
		}
		switch (bonusType) {
			case '축제':
				cardsPresenter.changeFestivalState(card);
				break;
			case '올림픽':
				cardsPresenter.changeOlympicPhase(card);
				break;
		}
		setDialog(false);
		displayingUserConfirmDialog(false);
	};

	return (
		<Container>
			<Title>
				<h2>{title}</h2>
			</Title>
			<p>
				위 도시를 <span className='bonusType'>{bonusType}도시</span>로
				지정하시겠습니까?{' '}
			</p>
			<Submit>
				<button className='true' onClick={onConfirmClick}>
					✔
				</button>
				<button onClick={() => displayingUserConfirmDialog(false)}>❌</button>
			</Submit>
		</Container>
	);
}

export default UserConfirmDialog;
