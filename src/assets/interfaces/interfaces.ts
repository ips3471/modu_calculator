//Cards-----------------------------------------------------------
export type NormalCityNames =
	| '방콕'
	| '베이징'
	| '타이페이'
	| '두바이'
	| '카이로'
	| '도쿄'
	| '시드니'
	| '퀘백'
	| '상파울로'
	| '프라하'
	| '베를린'
	| '모스크바'
	| '제네바'
	| '로마'
	| '런던'
	| '파리'
	| '뉴욕'
	| '서울';
export type VacationSpotNames = '독도' | '발리' | '하와이' | '타히티' | '푸켓';
export type CardNames = VacationSpotNames | NormalCityNames;
export type Costs<
	T extends NormalCityBuildOptions | VacationSpotBuildOptions,
	N extends NormalCityNames | VacationSpotNames,
> = {
	[key in N]: Cost<T>;
};
export type Cost<T extends BuildOptions> = Record<
	T,
	Record<ActionOptions, number | undefined>
>;
export type Infos<T extends NormalCityNames | VacationSpotNames> = {
	[key in T]: CardInfo<T>;
};
export type OlympicState = {
	state: boolean;
};
export type CardInfo<T extends NormalCityNames | VacationSpotNames> = {
	id: number;
	line: '1' | '2' | '3' | '4';
	color:
		| 'green'
		| 'dark-green'
		| 'blue'
		| 'dark-blue'
		| 'pink'
		| 'purple'
		| 'orange'
		| 'red'
		| 'light-pink'
		| 'light-blue';
	isVacationSpot: T extends NormalCityNames
		? false
		: T extends VacationSpotNames
		? true
		: null;
	isFestival: boolean;
	olympicPhase: number;
	name: T;
	src: string;
	belonged: boolean;
};
export type CostTable<T extends BuildOptions> = Record<T, CostByAction>;

/** Constructing */
export type NormalCityBuildOptions = 'land' | 'villa' | 'building' | 'hotel' | 'landmark';
export type VacationSpotBuildOptions = 'flag' | 'parasol' | 'bangalore';
export type BuildOptions = NormalCityBuildOptions | VacationSpotBuildOptions;
export type ConstructionIcon =
	| 'flag'
	| 'archway'
	| 'landmark'
	| 'store'
	| 'building'
	| 'hotel'
	| 'mosque';
export type ConstructionName =
	| '땅'
	| '파라솔'
	| '방갈로'
	| '별장'
	| '빌딩'
	| '호텔'
	| '랜드마크';
/** Action */
export type CostByAction = Record<ActionOptions, number | undefined>;
export type ActionOptions = 'buy' | 'pay' | 'takeOver' | 'sell';

/** App */
export type UpdatingState<T> = (state: T) => void;
export type ExecutingStates<T extends BuildOptions | ActionOptions> = {
	[state in T]: boolean;
};
