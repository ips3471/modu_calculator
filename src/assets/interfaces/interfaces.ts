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

export type CostTable<T extends NormalCityLevel | VacationSpotLevel> = Record<
	T,
	CostByAction
>;

export type CostByAction = Record<ActionTypes, number | undefined>;

/** Constructing */
export type IsConstructingStates = {
	[construction in NormalCityLevel | VacationSpotLevel]: boolean;
};
export type IsExecutingStates = {
	[Actions in ActionTypes]: boolean;
};
export type ConstructionTypes = NormalCityLevel | VacationSpotLevel;

/** App */
export type UpdateSelectedConstructions = (type: ConstructionTypes) => void;
export type UpdateSelectedActions = (type: ActionTypes) => void;
export type UpdateSelectedCard = (card: Card) => void;
