import ActionsPresenter from '../actions';

describe('ActionsPresenter', () => {
	let presenter;
	const actions = {
		buy: false,
		pay: true,
		takeOver: true,
		sell: false,
	};
	let constructions;
	let update;

	beforeEach(() => {
		presenter = new ActionsPresenter(actions);
		update = jest.fn();
		constructions = {
			land: false,
			villa: false,
			building: false,
			hotel: false,
			landmark: false,
			flag: false,
			parasol: false,
			bangalore: false,
		};
	});

	it('gets all items', () => {
		expect(presenter.getAll()).toEqual({
			buy: false,
			pay: true,
			takeOver: true,
			sell: false,
		});
	});

	it('gets all items which state is true', () => {
		expect(presenter.getTrues()).toEqual(['pay', 'takeOver']);
	});

	it('resets all state to false', () => {
		presenter.resetAll(update);
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['pay']).toBe(false);
	});

	it('reverse the state of selected item', () => {
		presenter.toggleState('buy', update);
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['buy']).toBe(true);
		presenter.toggleState('buy', update);
		expect(presenter.getAll()['buy']).toBe(false);
	});

	it('changes selected one to true and makes false other selected', () => {
		presenter.disableStatesExcept('buy', update, 'pay', 'takeOver');
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['pay']).toBe(false);
		expect(presenter.getAll()['takeOver']).toBe(false);
		expect(presenter.getAll()['buy']).toBe(true);
	});

	it('change selected states to false', () => {
		presenter.disableStatesOf(update, 'pay', 'takeOver');
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['pay']).toBe(false);
		expect(presenter.getAll()['takeOver']).toBe(false);
	});
});
