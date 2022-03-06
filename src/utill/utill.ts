import {
	CostTable,
	NormalCityLevel,
	VacationSpotLevel,
	Card,
} from './../assets/interfaces/interfaces';

const BASE_SRC = `/imgs/cards/`; // PUBLIC URL
export const SPECIAL_COST: CostTable<VacationSpotLevel> =
	printCostTableForVacationSpot(10, 8, 16, 32, 5, 5, 5);

export function printCostTableForNormalCity(
	buy_land: number,
	buy_villa: number,
	buy_building: number,
	buy_hotel: number,
	buy_landmark: number,
	pay_land: number,
	pay_villa: number,
	pay_building: number,
	pay_hotel: number,
	pay_landmark: number,
	takeOver_land: number,
	takeOver_villa: number,
	takeOver_building: number,
	takeOver_hotel: number,
	sell_land: number,
	sell_villa: number,
	sell_building: number,
	sell_hotel: number,
	sell_landmark: number,
): CostTable<NormalCityLevel> {
	return {
		land: {
			buy: buy_land,
			pay: pay_land,
			takeOver: takeOver_land,
			sell: sell_land,
		},
		villa: {
			buy: buy_villa,
			pay: pay_villa,
			takeOver: takeOver_villa,
			sell: sell_villa,
		},
		building: {
			buy: buy_building,
			pay: pay_building,
			takeOver: takeOver_building,
			sell: sell_building,
		},
		hotel: {
			buy: buy_hotel,
			pay: pay_hotel,
			takeOver: takeOver_hotel,
			sell: sell_hotel,
		},
		landmark: {
			buy: buy_landmark,
			pay: pay_landmark,
			takeOver: undefined,
			sell: sell_landmark,
		},
	};
}
export function printCostTableForVacationSpot(
	buy_flag: number,
	pay_flag: number,
	pay_parasol: number,
	pay_bangalore: number,
	sell_flag: number,
	sell_parasol: number,
	sell_bangalore: number,
): CostTable<VacationSpotLevel> {
	return {
		flag: {
			buy: buy_flag,
			pay: pay_flag,
			takeOver: undefined,
			sell: sell_flag,
		},
		parasol: {
			buy: undefined,
			pay: pay_parasol,
			takeOver: undefined,
			sell: sell_parasol,
		},
		bangalore: {
			buy: undefined,
			pay: pay_bangalore,
			takeOver: undefined,
			sell: sell_bangalore,
		},
	};
}

export function printCard(
	id: string, //PARING WITH FILENAME(IMG)
	line: '1' | '2' | '3' | '4',
	isVacationSpot: boolean,
	name: string,
	cost: CostTable<NormalCityLevel> | CostTable<VacationSpotLevel>,
) {
	return {
		id,
		line,
		isVacationSpot,
		name,
		src: `${BASE_SRC}${id}.jpg`,
		cost,
	};
}
