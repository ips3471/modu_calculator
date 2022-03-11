import {
	ExecutingStates,
	NormalCityBuildOptions,
	VacationSpotBuildOptions,
	BuildOptions,
} from './../../assets/interfaces/interfaces';
import { SetStateAction } from 'react';

class ConstructionsPresenter {
	constructions;
	constructor(constructions: ExecutingStates<BuildOptions>) {
		this.constructions = constructions;
	}

	getAll() {
		return this.constructions;
	}

	resetAll(update: React.Dispatch<SetStateAction<ExecutingStates<BuildOptions>>>) {
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
				updated[
					construction as NormalCityBuildOptions | VacationSpotBuildOptions
				] === true,
		) as NormalCityBuildOptions[] | VacationSpotBuildOptions[];
	}

	toggleState(
		construction: BuildOptions,
		update: React.Dispatch<SetStateAction<ExecutingStates<BuildOptions>>>,
	) {
		const updated = { ...this.constructions };
		updated[construction] = !updated[construction];
		this.constructions = updated;
		update(this.constructions);
	}

	disableStatesExcept(
		construction: BuildOptions,
		update: React.Dispatch<SetStateAction<ExecutingStates<BuildOptions>>>,
		...toDisables: BuildOptions[]
	) {
		const updated = { ...this.constructions };
		if (toDisables.length > 0) {
			toDisables.forEach(toDisable => {
				if (updated[toDisable]) {
					updated[toDisable] = false;
				}
			});
		} else {
			Object.keys(updated).forEach(key => {
				if (
					key !== construction &&
					updated[key as keyof typeof updated] === true
				) {
					updated[key as keyof typeof updated] = false;
				}
			});
		}
		updated[construction] = true;
		this.constructions = updated;
		update(this.constructions);
	}

	disableStatesOf(
		update: React.Dispatch<SetStateAction<ExecutingStates<BuildOptions>>>,
		...states: BuildOptions[]
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
