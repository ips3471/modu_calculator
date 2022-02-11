import React, { useState } from 'react';
import CardItem from './card-item';
import styled from 'styled-components';
import { AscendingArr } from '../utill/utill';

const Container = styled.ul`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 2px;
	grid-auto-rows: 4.5rem;
`;

export type GeneralCostForNormalCity = {
	land: number;
	villa: number;
	building: number;
	hotel: number;
	landmark: number;
};
export type GeneralCostForVacationSpot = {
	flag: number;
	parasol: number;
	bangalore: number;
};
type NotMergableForNormalCity = Omit<GeneralCostForNormalCity, 'landmark'>;
type GettableForVacationSpot = Omit<
	GeneralCostForVacationSpot,
	'parasol' | 'bangalore'
>;

const SPECIAL_COST: CostForVacationSpot = {
	// 모든 VacationSpot은 공통된 cost를 적용
	buy: {
		flag: 10,
	},
	pay: {
		flag: 8,
		parasol: 16,
		bangalore: 32,
	},
	sell: {
		flag: 5,
		parasol: 5,
		bangalore: 5,
	},
};
export type CostForNormalCity = {
	buy: GeneralCostForNormalCity;
	pay: GeneralCostForNormalCity;
	takeOver: NotMergableForNormalCity;
	sell: GeneralCostForNormalCity;
};
export type CostForVacationSpot = {
	buy: GettableForVacationSpot;
	pay: GeneralCostForVacationSpot;
	sell: GeneralCostForVacationSpot;
};

export type Card = {
	id: number;
	name: string;
	line: number;
	isVacationSpot: boolean;
	src: string;
	cost: CostForNormalCity | CostForVacationSpot;
};

type HabitsProps = {
	updateCity: (city: Card) => void;
};

function Cards({ updateCity }: HabitsProps) {
	const BASE_SRC = `/imgs/cards/`;
	const [cards, setCards] = useState<Card[]>([
		{
			id: 1,
			line: 1,
			isVacationSpot: false,
			name: '방콕',
			src: `${BASE_SRC}1.jpg`,
			cost: {
				buy: {
					land: 2,
					villa: 1,
					building: 4,
					hotel: 6,
					landmark: 6,
				},
				pay: {
					land: 0.5,
					villa: 1,
					building: 2,
					hotel: 6,
					landmark: 25,
				},
				takeOver: {
					land: 4,
					villa: 2,
					building: 8,
					hotel: 12,
				},
				sell: {
					land: 1,
					villa: 0.5,
					building: 2,
					hotel: 3,
					landmark: 3,
				},
			},
		},
		{
			id: 2,
			line: 1,
			isVacationSpot: false,
			name: '베이징',
			src: `${BASE_SRC}2.jpg`,
			cost: {
				buy: {
					land: 3,
					villa: 1,
					building: 4,
					hotel: 6,
					landmark: 6,
				},
				pay: {
					land: 0.5,
					villa: 1,
					building: 2,
					hotel: 6,
					landmark: 25,
				},
				takeOver: {
					land: 6,
					villa: 2,
					building: 8,
					hotel: 12,
				},
				sell: {
					land: 1.5,
					villa: 0.5,
					building: 2,
					hotel: 3,
					landmark: 3,
				},
			},
		},
		{
			id: 4,
			line: 1,
			isVacationSpot: false,
			name: '타이페이',
			src: `${BASE_SRC}4.jpg`,
			cost: {
				buy: {
					land: 4,
					villa: 2,
					building: 6,
					hotel: 10,
					landmark: 10,
				},
				pay: {
					land: 1,
					villa: 2,
					building: 4,
					hotel: 12,
					landmark: 45,
				},
				takeOver: {
					land: 8,
					villa: 4,
					building: 12,
					hotel: 20,
				},
				sell: {
					land: 2,
					villa: 1,
					building: 3,
					hotel: 5,
					landmark: 5,
				},
			},
		},
		{
			id: 5,
			line: 1,
			isVacationSpot: false,
			name: '두바이',
			src: `${BASE_SRC}5.jpg`,
			cost: {
				buy: {
					land: 4,
					villa: 2,
					building: 6,
					hotel: 10,
					landmark: 10,
				},
				pay: {
					land: 1,
					villa: 2,
					building: 4,
					hotel: 12,
					landmark: 45,
				},
				takeOver: {
					land: 8,
					villa: 4,
					building: 12,
					hotel: 20,
				},
				sell: {
					land: 2,
					villa: 1,
					building: 3,
					hotel: 5,
					landmark: 5,
				},
			},
		},
		{
			id: 6,
			line: 1,
			isVacationSpot: false,
			name: '카이로',
			src: `${BASE_SRC}6.jpg`,
			cost: {
				buy: {
					land: 6,
					villa: 2,
					building: 6,
					hotel: 10,
					landmark: 10,
				},
				pay: {
					land: 1,
					villa: 2,
					building: 5,
					hotel: 13,
					landmark: 45,
				},
				takeOver: {
					land: 12,
					villa: 4,
					building: 12,
					hotel: 20,
				},
				sell: {
					land: 3,
					villa: 1,
					building: 3,
					hotel: 5,
					landmark: 5,
				},
			},
		},
		{
			id: 8,
			line: 2,
			isVacationSpot: false,
			name: '도쿄',
			src: `${BASE_SRC}8.jpg`,
			cost: {
				buy: {
					land: 8,
					villa: 4,
					building: 8,
					hotel: 16,
					landmark: 16,
				},
				pay: {
					land: 2,
					villa: 3,
					building: 8,
					hotel: 22,
					landmark: 60,
				},
				takeOver: {
					land: 16,
					villa: 8,
					building: 16,
					hotel: 32,
				},
				sell: {
					land: 4,
					villa: 2,
					building: 4,
					hotel: 8,
					landmark: 8,
				},
			},
		},
		{
			id: 9,
			line: 2,
			isVacationSpot: false,
			name: '시드니',
			src: `${BASE_SRC}9.jpg`,
			cost: {
				buy: {
					land: 8,
					villa: 4,
					building: 8,
					hotel: 16,
					landmark: 16,
				},
				pay: {
					land: 2,
					villa: 3,
					building: 8,
					hotel: 22,
					landmark: 60,
				},
				takeOver: {
					land: 16,
					villa: 8,
					building: 16,
					hotel: 32,
				},
				sell: {
					land: 4,
					villa: 2,
					building: 4,
					hotel: 8,
					landmark: 8,
				},
			},
		},
		{
			id: 10,
			line: 2,
			isVacationSpot: false,
			name: '퀘백',
			src: `${BASE_SRC}10.jpg`,
			cost: {
				buy: {
					land: 10,
					villa: 4,
					building: 12,
					hotel: 20,
					landmark: 20,
				},
				pay: {
					land: 2,
					villa: 5,
					building: 11,
					hotel: 27,
					landmark: 70,
				},
				takeOver: {
					land: 20,
					villa: 8,
					building: 24,
					hotel: 40,
				},
				sell: {
					land: 5,
					villa: 2,
					building: 6,
					hotel: 10,
					landmark: 10,
				},
			},
		},
		{
			id: 12,
			line: 2,
			isVacationSpot: false,
			name: '상파울로',
			src: `${BASE_SRC}12.jpg`,
			cost: {
				buy: {
					land: 10,
					villa: 4,
					building: 12,
					hotel: 20,
					landmark: 20,
				},
				pay: {
					land: 3,
					villa: 5,
					building: 12,
					hotel: 28,
					landmark: 70,
				},
				takeOver: {
					land: 20,
					villa: 8,
					building: 24,
					hotel: 40,
				},
				sell: {
					land: 5,
					villa: 2,
					building: 6,
					hotel: 10,
					landmark: 10,
				},
			},
		},
		{
			id: 13,
			line: 3,
			isVacationSpot: false,
			name: '프라하',
			src: `${BASE_SRC}13.jpg`,
			cost: {
				buy: {
					land: 12,
					villa: 4,
					building: 14,
					hotel: 24,
					landmark: 24,
				},
				pay: {
					land: 3,
					villa: 7,
					building: 17,
					hotel: 39,
					landmark: 75,
				},
				takeOver: {
					land: 24,
					villa: 8,
					building: 28,
					hotel: 48,
				},
				sell: {
					land: 6,
					villa: 2,
					building: 7,
					hotel: 12,
					landmark: 12,
				},
			},
		},
		{
			id: 15,
			line: 3,
			isVacationSpot: false,
			name: '베를린',
			src: `${BASE_SRC}15.jpg`,
			cost: {
				buy: {
					land: 12,
					villa: 4,
					building: 14,
					hotel: 24,
					landmark: 24,
				},
				pay: {
					land: 3,
					villa: 7,
					building: 17,
					hotel: 39,
					landmark: 75,
				},
				takeOver: {
					land: 24,
					villa: 8,
					building: 28,
					hotel: 48,
				},
				sell: {
					land: 6,
					villa: 2,
					building: 7,
					hotel: 12,
					landmark: 12,
				},
			},
		},
		{
			id: 16,
			line: 3,
			isVacationSpot: false,
			name: '모스크바',
			src: `${BASE_SRC}16.jpg`,
			cost: {
				buy: {
					land: 14,
					villa: 6,
					building: 18,
					hotel: 30,
					landmark: 30,
				},
				pay: {
					land: 4,
					villa: 8,
					building: 20,
					hotel: 46,
					landmark: 75,
				},
				takeOver: {
					land: 28,
					villa: 12,
					building: 36,
					hotel: 60,
				},
				sell: {
					land: 7,
					villa: 3,
					building: 9,
					hotel: 15,
					landmark: 15,
				},
			},
		},
		{
			id: 17,
			line: 3,
			isVacationSpot: false,
			name: '제네바',
			src: `${BASE_SRC}17.jpg`,
			cost: {
				buy: {
					land: 14,
					villa: 6,
					building: 18,
					hotel: 30,
					landmark: 30,
				},
				pay: {
					land: 5,
					villa: 9,
					building: 22,
					hotel: 47,
					landmark: 75,
				},
				takeOver: {
					land: 28,
					villa: 12,
					building: 36,
					hotel: 60,
				},
				sell: {
					land: 7,
					villa: 3,
					building: 9,
					hotel: 15,
					landmark: 15,
				},
			},
		},
		{
			id: 18,
			line: 3,
			isVacationSpot: false,
			name: '로마',
			src: `${BASE_SRC}18.jpg`,
			cost: {
				buy: {
					land: 14,
					villa: 6,
					building: 18,
					hotel: 30,
					landmark: 30,
				},
				pay: {
					land: 5,
					villa: 9,
					building: 22,
					hotel: 47,
					landmark: 75,
				},
				takeOver: {
					land: 28,
					villa: 12,
					building: 36,
					hotel: 60,
				},
				sell: {
					land: 7,
					villa: 3,
					building: 9,
					hotel: 15,
					landmark: 15,
				},
			},
		},
		{
			id: 20,
			line: 4,
			isVacationSpot: false,
			name: '런던',
			src: `${BASE_SRC}20.jpg`,
			cost: {
				buy: {
					land: 16,
					villa: 8,
					building: 22,
					hotel: 36,
					landmark: 36,
				},
				pay: {
					land: 5,
					villa: 12,
					building: 28,
					hotel: 60,
					landmark: 70,
				},
				takeOver: {
					land: 32,
					villa: 16,
					building: 44,
					hotel: 72,
				},
				sell: {
					land: 8,
					villa: 4,
					building: 11,
					hotel: 18,
					landmark: 18,
				},
			},
		},
		{
			id: 21,
			line: 4,
			isVacationSpot: false,
			name: '파리',
			src: `${BASE_SRC}21.jpg`,
			cost: {
				buy: {
					land: 18,
					villa: 8,
					building: 22,
					hotel: 36,
					landmark: 36,
				},
				pay: {
					land: 6,
					villa: 13,
					building: 29,
					hotel: 62,
					landmark: 70,
				},
				takeOver: {
					land: 36,
					villa: 16,
					building: 44,
					hotel: 72,
				},
				sell: {
					land: 9,
					villa: 4,
					building: 11,
					hotel: 18,
					landmark: 18,
				},
			},
		},
		{
			id: 22,
			line: 4,
			isVacationSpot: false,
			name: '뉴욕',
			src: `${BASE_SRC}22.jpg`,
			cost: {
				buy: {
					land: 20,
					villa: 8,
					building: 24,
					hotel: 40,
					landmark: 40,
				},
				pay: {
					land: 7,
					villa: 15,
					building: 32,
					hotel: 68,
					landmark: 60,
				},
				takeOver: {
					land: 40,
					villa: 16,
					building: 48,
					hotel: 80,
				},
				sell: {
					land: 10,
					villa: 4,
					building: 12,
					hotel: 20,
					landmark: 20,
				},
			},
		},
		{
			id: 23,
			line: 4,
			isVacationSpot: false,
			name: '서울',
			src: `${BASE_SRC}23.jpg`,
			cost: {
				buy: {
					land: 22,
					villa: 8,
					building: 24,
					hotel: 40,
					landmark: 40,
				},
				pay: {
					land: 8,
					villa: 16,
					building: 34,
					hotel: 70,
					landmark: 60,
				},
				takeOver: {
					land: 44,
					villa: 16,
					building: 48,
					hotel: 80,
				},
				sell: {
					land: 11,
					villa: 4,
					building: 12,
					hotel: 20,
					landmark: 20,
				},
			},
		},
		{
			id: 3,
			line: 1,
			isVacationSpot: true,
			name: '독도',
			src: `${BASE_SRC}3.jpg`,
			cost: SPECIAL_COST,
		},
		{
			id: 7,
			line: 2,
			isVacationSpot: true,
			name: '발리',
			src: `${BASE_SRC}7.jpg`,
			cost: SPECIAL_COST,
		},
		{
			id: 11,
			line: 2,
			isVacationSpot: true,
			name: '하와이',
			src: `${BASE_SRC}11.jpg`,
			cost: SPECIAL_COST,
		},
		{
			id: 14,
			line: 3,
			isVacationSpot: true,
			name: '푸켓',
			src: `${BASE_SRC}14.jpg`,
			cost: SPECIAL_COST,
		},
		{
			id: 19,
			line: 4,
			isVacationSpot: true,
			name: '타히티',
			src: `${BASE_SRC}19.jpg`,
			cost: SPECIAL_COST,
		},
	]);

	return (
		<Container>
			{cards.sort(AscendingArr).map(card => (
				<CardItem updateCity={updateCity} key={card.id} card={card} />
			))}
		</Container>
	);
}

export default Cards;
