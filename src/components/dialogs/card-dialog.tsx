import React, { useState } from 'react';
import styled from 'styled-components';
import {
	NormalCityNames,
	UpdatingState,
	VacationSpotNames,
} from '../../assets/interfaces/interfaces';
import CardsPresenter from '../../presenter/cards/cards';
import UserConfirmDialog from './user-confirm';

const Container = styled.div<IContainerStyleProps>`
	padding: 1rem 1.5rem;
	display: ${props => (props.userConfirmDialog ? 'none' : 'flex')};
	flex-direction: column;
	align-items: center;
	position: absolute;
	border-radius: 20px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 1rem;
	background-color: rgba(0, 0, 0, 0.5);
	user-select: none;
`;

const Main = styled.div<ICardDialogButtonProps>`
	font-size: 2.2rem;
	white-space: nowrap;
	padding: 1rem 0;
	& > div {
		text-align: center;
		padding: 0.5rem 0;
	}
	& > * > button {
		padding: 0.5em;
		background-color: transparent;
		padding: 0 2rem;
		font-size: 1.2em;
	}
	& > .card > button.card__allow {
		opacity: ${props => (props.isBelonged ? '0.2' : '1')};
		pointer-events: ${props => (props.isBelonged ? 'none' : 'all')};
	}
	& > .card > button.card__discard {
		opacity: ${props => (props.isBelonged ? '1' : '0.2')};
		pointer-events: ${props => (props.isBelonged ? 'all' : 'none')};
	}
`;

const Title = styled.div`
	color: ${props => props.theme.color.main};
`;

const CheckIcon = styled.i<IbuttonIconProps>`
	color: ${props => (props.allowed ? 'green' : 'red')};
`;

const Cancel = styled.div`
	width: 100%;
	& > button {
		width: 100%;
		background-color: #ffffff20;
		border-radius: 20px;
		padding: 0.8em 0;
		color: ${props => props.theme.color.main};
	}
`;

interface IbuttonIconProps {
	allowed?: boolean;
}

interface IContainerStyleProps {
	userConfirmDialog?: boolean;
}

interface ICardDialogButtonProps {
	isBelonged?: boolean;
}

type CardDialogProps = {
	displayDialog: UpdatingState<boolean>;
	title: NormalCityNames | VacationSpotNames | undefined;
	cardsPresenter: CardsPresenter;
	setDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function CardDialog({
	displayDialog,
	title,
	cardsPresenter,
	setDialog,
}: CardDialogProps) {
	const [userConfirmDialog, setUserConfirmDialog] = useState(false);
	const [bonusState, setBonusState] = useState<'축제' | '올림픽'>();
	const card = cardsPresenter.getCard();
	const onUpdateBelongedClick = () => {
		card && cardsPresenter.changeBelongedState(card);
		displayDialog(false);
	};
	const onOlympicBonusClick = () => {
		setBonusState('올림픽');
		setUserConfirmDialog(true);
	};
	const onFestivalBonusClick = () => {
		setBonusState('축제');
		setUserConfirmDialog(true);
	};

	return (
		<>
			<Container userConfirmDialog={userConfirmDialog}>
				<Title>
					<h2>{title}</h2>
				</Title>
				<Main isBelonged={card?.belonged}>
					<div className='add_olympic'>
						<button
							onClick={onOlympicBonusClick}
							className='olympic'
						>
							🏆
						</button>
					</div>
					<div className='add_festival'>
						<button
							onClick={onFestivalBonusClick}
							className='festival'
						>
							🎀
						</button>
					</div>
					<div className='card'>
						<button
							className='card__allow'
							onClick={onUpdateBelongedClick}
						>
							<CheckIcon
								allowed
								className='fas fa-square-check'
							></CheckIcon>
						</button>
						<button
							className='card__discard'
							onClick={onUpdateBelongedClick}
						>
							<CheckIcon className='fas fa-rectangle-xmark'></CheckIcon>
						</button>
					</div>
				</Main>
				<Cancel>
					<button onClick={() => displayDialog(false)}>
						<i className='fas fa-arrow-rotate-left'></i> 이전으로
					</button>
				</Cancel>
			</Container>
			{userConfirmDialog && (
				<UserConfirmDialog
					setDialog={setDialog}
					card={card}
					cardsPresenter={cardsPresenter}
					displayingUserConfirmDialog={setUserConfirmDialog}
					title={title}
					bonusType={bonusState && bonusState}
				/>
			)}
		</>
	);
}

export default CardDialog;
