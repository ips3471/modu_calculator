import {
	ExecutingStates,
	ActionTypes,
} from './../../assets/interfaces/interfaces';
import { SetStateAction } from 'react';

class ActionsPresenter {
	actions;
	constructor(actions: ExecutingStates<ActionTypes>) {
		this.actions = actions;
	}

	getAll() {
		return this.actions;
	}

	resetAll(
		update: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
	) {
		const updated = { ...this.actions };
		Object.keys(updated).forEach(item => {
			if (updated[item as keyof typeof updated]) {
				updated[item as keyof typeof updated] = false;
			}
		});
		this.actions = updated;
		update(this.actions);
	}

	getTrues() {
		const updated = { ...this.actions };
		return Object.keys(updated).filter(
			actions => updated[actions as keyof typeof updated] === true,
		);
	}

	toggleState(
		actions: ActionTypes,
		update: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
	) {
		const updated = { ...this.actions };
		updated[actions] = !updated[actions];
		this.actions = updated;
		update(this.actions);
	}

	disableStatesExcept(
		actions: ActionTypes,
		update: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		...toDisables: ActionTypes[]
	) {
		const updated = { ...this.actions };
		if (toDisables.length > 0) {
			toDisables.forEach(toDisable => {
				if (updated[toDisable]) {
					updated[toDisable] = false;
				}
			});
		} else {
			Object.keys(updated).forEach(key => {
				if (
					key !== actions &&
					updated[key as keyof typeof updated] === true
				) {
					updated[key as keyof typeof updated] = false;
				}
			});
		}
		updated[actions] = true;
		this.actions = updated;
		update(this.actions);
	}

	disableStatesOf(
		update: React.Dispatch<SetStateAction<ExecutingStates<ActionTypes>>>,
		...states: ActionTypes[]
	) {
		const updated = { ...this.actions };
		states.forEach(state => {
			if (updated[state]) {
				updated[state] = false;
			}
		});
		this.actions = updated;
		update(this.actions);
	}
}

export default ActionsPresenter;
