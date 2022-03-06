import ConstructionsPresenter from '../constructions';

describe('ConstructionsPresenter', () => {
	let presenter;
	const constructions = {
		land: true,
		villa: false,
		building: true,
	};
	let update;

	beforeEach(() => {
		presenter = new ConstructionsPresenter(constructions);
		update = jest.fn();
	});

	it('gets all items', () => {
		expect(presenter.getAll()).toEqual({
			land: true,
			villa: false,
			building: true,
		});
	});

	it('gets all items which state is true', () => {
		expect(presenter.getTrues()).toEqual(['land', 'building']);
	});

	it('resets all state to false', () => {
		presenter.resetAll(update);
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['land']).toBe(false);
	});

	it('reverse the state of selected item', () => {
		presenter.toggleState('land', update);
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['land']).toBe(false);
		presenter.toggleState('land', update);
		expect(presenter.getAll()['land']).toBe(true);
	});

	it('change whole states to false except selected one', () => {
		presenter.disableStatesExcept('villa', update);
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['land']).toBe(false);
		expect(presenter.getAll()['building']).toBe(false);
		expect(presenter.getAll()['villa']).toBe(true);
	});

	it('change selected states to false', () => {
		presenter.disableStatesOf(update, 'land', 'building');
		expect(update).toHaveBeenCalledTimes(1);
		expect(presenter.getAll()['land']).toBe(false);
		expect(presenter.getAll()['building']).toBe(false);
	});
});
