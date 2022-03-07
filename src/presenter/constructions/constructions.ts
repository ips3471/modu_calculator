import {
	ExecutingStates,
	WholeConstructionTypes,
} from './../../assets/interfaces/interfaces';
import { SetStateAction } from 'react';

class ConstructionsPresenter {
	constructions;
	constructor(constructions: ExecutingStates<WholeConstructionTypes>) {
		this.constructions = constructions;
	}

	getAll() {
		return this.constructions;
	}

	resetAll(
		update: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
	) {
		const updated = { ...this.constructions };
		Object.keys(updated).forEach(item => {
			updated[item as keyof typeof updated] = false;
		});
		this.constructions = updated;
		update(this.constructions);
	}

	getTrues() {
		const updated = { ...this.constructions };
		return Object.keys(updated).filter(
			construction =>
				updated[construction as keyof typeof updated] === true,
		);
	}

	toggleState(
		construction: WholeConstructionTypes,
		update: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
	) {
		const updated = { ...this.constructions };
		updated[construction] = !updated[construction];
		this.constructions = updated;
		update(this.constructions);
	}

	disableStatesExcept(
		construction: WholeConstructionTypes,
		update: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
	) {
		const updated = { ...this.constructions };
		Object.keys(updated).forEach(key => {
			if (
				key !== construction &&
				updated[key as keyof typeof updated] === true
			) {
				updated[key as keyof typeof updated] = false;
			} else {
				updated[construction] = true;
			}
		});
		this.constructions = updated;
		update(this.constructions);
	}

	disableStatesOf(
		update: React.Dispatch<
			SetStateAction<ExecutingStates<WholeConstructionTypes>>
		>,
		...states: WholeConstructionTypes[]
	) {
		const updated = { ...this.constructions };
		states.forEach(state => {
			if (updated[state]) {
				updated[state] = false;
			}
		});
		this.constructions = updated;
		update(this.constructions);
	}
}

export default ConstructionsPresenter;
