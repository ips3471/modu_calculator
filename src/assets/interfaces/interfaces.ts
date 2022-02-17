/** Cards */
export type NormalCityLevel =
	| 'land'
	| 'villa'
	| 'building'
	| 'hotel'
	| 'landmark';
export type VacationSpotLevel = 'flag' | 'parasol' | 'bangalore';
export type ActionTypes = 'buy' | 'pay' | 'takeOver' | 'sell';
export type Card = {
	id: string;
	line: '1' | '2' | '3' | '4';
	isVacationSpot: boolean;
	name: string;
	src: string;
	cost: CostTable<NormalCityLevel> | CostTable<VacationSpotLevel>;
};
export type Cards = {
	[key: string]: Card;
};

export type WholeConstructionTypes = NormalCityLevel | VacationSpotLevel;

export type CostTable<T extends WholeConstructionTypes> = Record<
	T,
	CostByAction
>;

/** Constructing */
export type ConstructionTypes = NormalCityLevel | VacationSpotLevel;

/** Action */
export type CostByAction = Record<ActionTypes, number | undefined>;

/** App */
export type UpdatingState<T> = (state: T) => void;
export type ExecutingStates<T extends WholeConstructionTypes | ActionTypes> = {
	[state in T]: boolean;
};
