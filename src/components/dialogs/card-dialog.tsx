import React from 'react';
import styled from 'styled-components';
import {
	NormalCityNames,
	UpdatingState,
	VacationSpotNames,
} from '../../assets/interfaces/interfaces';
import CardsPresenter from '../../presenter/cards/cards';

const Container = styled.div`
	padding: 1rem 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* border: 1px solid red; */
	position: absolute;
	border-radius: 20px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	gap: 1rem;
	background-color: rgba(0, 0, 0, 0.5);
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

interface ICardDialogButtonProps {
	isBelonged?: boolean;
}

type CardDialogProps = {
	displayDialog: UpdatingState<boolean>;
	title: NormalCityNames | VacationSpotNames | undefined;
	cardsPresenter: CardsPresenter;
};

function CardDialog({ displayDialog, title, cardsPresenter }: CardDialogProps) {
	const card = cardsPresenter.getCard();
	const onClick = () => {
		card && cardsPresenter.updateCard(card, undefined, 'belonged');
		displayDialog(false);
	};

	return (
		<Container>
			<Title>
				<h2>{title}</h2>
			</Title>
			<Main isBelonged={card?.belonged}>
				<div className='add_olympic'>
					<button className='olympic'>🏆</button>
				</div>
				<div className='add_festival'>
					<button className='festival'>🎀</button>
				</div>
				<div className='card'>
					<button className='card__allow' onClick={onClick}>
						<CheckIcon allowed className='fas fa-square-check'></CheckIcon>
					</button>
					<button className='card__discard' onClick={onClick}>
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
	);
}

export default CardDialog;
