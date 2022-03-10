import {
	Infos,
	NormalCityBuildOptions,
	VacationSpotBuildOptions,
	NormalCityNames,
	VacationSpotNames,
	Costs,
	CardInfo,
	Cost,
} from './../../assets/interfaces/interfaces';
import CardsDB from '../../model/db/cards/cards';

class CardsPresenter {
	private readonly normalCityInfos: Infos<NormalCityNames>;
	private readonly vacationSpotsInfos: Infos<VacationSpotNames>;
	private readonly normalCityCosts: Costs<NormalCityBuildOptions, NormalCityNames>;
	private readonly vacationSpotCosts: Costs<
		VacationSpotBuildOptions,
		VacationSpotNames
	>;
	private selectedCard: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames> | null =
		null;

	constructor(cardDB: CardsDB) {
		this.normalCityInfos = cardDB.normalCityInfos;
		this.vacationSpotsInfos = cardDB.vacationSpotInfos;
		this.normalCityCosts = cardDB.normalCityCosts;
		this.vacationSpotCosts = cardDB.vacationSpotCosts;
	}

	getCard(): CardInfo<NormalCityNames> | CardInfo<VacationSpotNames> | null {
		return this.selectedCard;
	}

	getInfos() {
		const cards = { ...this.normalCityInfos, ...this.vacationSpotsInfos };
		return cards;
	}

	getCostTable(
		card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>,
	): Cost<NormalCityBuildOptions> | Cost<VacationSpotBuildOptions> {
		if (card.isVacationSpot) {
			return this.vacationSpotCosts[card.name];
		} else {
			return this.normalCityCosts[card.name];
		}
	}

	updateCard(
		card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>,
		update: React.Dispatch<CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>>,
	) {
		this.selectedCard = card;
		update(this.selectedCard);
	}
}

export default CardsPresenter;
