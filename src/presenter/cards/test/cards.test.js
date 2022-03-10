import CardsPresenter from '../cards';

describe('CardsPresenter', () => {
	let presenter;
	const database = {
		normalCityInfos: {
			방콕: {
				id: '1',
				line: '1',
				isVacationSpot: false,
				name: '방콕',
				src: '/imgs/cards/1.jpg',
			},
			베이징: {
				id: '2',
				line: '1',
				isVacationSpot: false,
				name: '베이징',
				src: '/imgs/cards/2.jpg',
			},
		},
		normalCityCosts: {
			방콕: {
				land: { buy: 3, pay: 1, takeOver: 6, sell: 1.5 },
				villa: { buy: 1.5, pay: 1.5, takeOver: 3, sell: 1 },
				building: { buy: 2, pay: 2, takeOver: 4, sell: 1 },
				hotel: { buy: 3.5, pay: 3.5, takeOver: 7, sell: 2 },
				landmark: { buy: 5, pay: 11, sell: 7.5 },
			},
			베이징: {
				land: { buy: 3, pay: 1.5, takeOver: 6, sell: 1.5 },
				villa: { buy: 3, pay: 3, takeOver: 6, sell: 1.5 },
				building: { buy: 4, pay: 4, takeOver: 8, sell: 2 },
				hotel: { buy: 6.5, pay: 7, takeOver: 13, sell: 3.5 },
				landmark: { buy: 9, pay: 22, sell: 13 },
			},
		},
		vacationSpotInfos: {
			독도: {
				id: '4',
				line: '1',
				isVacationSpot: false,
				name: '독도',
				src: '/imgs/cards/4.jpg',
			},
			발리: {
				id: '7',
				line: '2',
				isVacationSpot: true,
				name: '발리',
				src: '/imgs/cards/7.jpg',
			},
		},
		vacationSpotCosts: {
			독도: {
				flag: {
					buy: 10,
					pay: 8,
					sell: 5,
				},
				parasol: {
					pay: 16,
					sell: 5,
				},
				bangalore: {
					pay: 32,
					sell: 5,
				},
			},
			발리: {
				flag: {
					buy: 10,
					pay: 8,
					sell: 5,
				},
				parasol: {
					pay: 16,
					sell: 5,
				},
				bangalore: {
					pay: 32,
					sell: 5,
				},
			},
		},
	};
	let update;
	let card;

	beforeEach(() => {
		presenter = new CardsPresenter(database);
		update = jest.fn();
		card = {
			id: '1',
			line: '1',
			isVacationSpot: false,
			name: '방콕',
			src: '/imgs/cards/1.jpg',
			cost: {
				land: {
					buy: 3,
					pay: 1,
					takeOver: 6,
					sell: 1.5,
				},
				villa: {
					buy: 1.5,
					pay: 1.5,
					takeOver: 3,
					sell: 1,
				},
				building: {
					buy: 2,
					pay: 2,
					takeOver: 4,
					sell: 1,
				},
				hotel: {
					buy: 3.5,
					pay: 3.5,
					takeOver: 7,
					sell: 2,
				},
				landmark: {
					buy: 5,
					pay: 11,
					sell: 7.5,
				},
			},
		};
	});

	//'selected card가 있다면 card를 return, 없다면 null return';

	it('updates selected card to current state', () => {
		presenter.updateCard(card, update);
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.selectedCard).toEqual(card);
	});

	// it('gets all items', () => {
	// 	expect(presenter.getAll()).toEqual({
	// 		buy: false,
	// 		pay: true,
	// 		takeOver: true,
	// 		sell: false,
	// 	});
	// });

	// it('gets all items which state is true', () => {
	// 	expect(presenter.getTrues()).toEqual(['pay', 'takeOver']);
	// });

	// it('resets all state to false', () => {
	// 	presenter.resetAll(update);
	// 	expect(update).toHaveBeenCalledTimes(1);
	// 	expect(presenter.getAll()['pay']).toBe(false);
	// });

	// it('reverse the state of selected item', () => {
	// 	presenter.toggleState('buy', update);
	// 	expect(update).toHaveBeenCalledTimes(1);
	// 	expect(presenter.getAll()['buy']).toBe(true);
	// 	presenter.toggleState('buy', update);
	// 	expect(presenter.getAll()['buy']).toBe(false);
	// });

	// it('changes selected one to true and makes false other selected', () => {
	// 	presenter.disableStatesExcept('buy', update, 'pay', 'takeOver');
	// 	expect(update).toHaveBeenCalledTimes(1);
	// 	expect(presenter.getAll()['pay']).toBe(false);
	// 	expect(presenter.getAll()['takeOver']).toBe(false);
	// 	expect(presenter.getAll()['buy']).toBe(true);
	// });

	// it('change selected states to false', () => {
	// 	presenter.disableStatesOf(update, 'pay', 'takeOver');
	// 	expect(update).toHaveBeenCalledTimes(1);
	// 	expect(presenter.getAll()['pay']).toBe(false);
	// 	expect(presenter.getAll()['takeOver']).toBe(false);
	// });
});
