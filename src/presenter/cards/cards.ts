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
	// private normalCityInfos: Infos<NormalCityNames>;
	// private vacationSpotsInfos: Infos<VacationSpotNames>;
	private cardInfos: Infos<NormalCityNames> & Infos<VacationSpotNames>;
	private readonly normalCityCosts: Costs<NormalCityBuildOptions, NormalCityNames>;
	private readonly vacationSpotCosts: Costs<
		VacationSpotBuildOptions,
		VacationSpotNames
	>;
	private selectedCard: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames> | null =
		null;

	constructor(cardDB: CardsDB) {
		// this.normalCityInfos = cardDB.normalCityInfos;
		// this.vacationSpotsInfos = cardDB.vacationSpotInfos;
		this.cardInfos = { ...cardDB.vacationSpotInfos, ...cardDB.normalCityInfos };
		this.normalCityCosts = cardDB.normalCityCosts;
		this.vacationSpotCosts = cardDB.vacationSpotCosts;
	}

	getCard(): CardInfo<NormalCityNames> | CardInfo<VacationSpotNames> | null {
		return this.selectedCard;
	}

	getInfos() {
		return this.cardInfos;
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
		// option?: keyof CardInfo<NormalCityNames | VacationSpotNames>,
	) {
		this.selectedCard = card;
		update(this.selectedCard);
	}

	changeBelongedState(card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>) {
		const cards = { ...this.cardInfos };
		cards[card.name].belonged = !cards[card.name].belonged;

		this.cardInfos = cards;
		// rendering
	}

	changeOlympicPhase(card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>) {
		const cards = { ...this.cardInfos };
		const selected = cards[card.name];

		if (selected.olympicPhase >= 4) {
			return;
		}
		Object.keys(cards).forEach(cardName => {
			if (cardName === selected.name) {
				selected.olympicPhase++;
			} else if (cards[cardName as keyof typeof cards].olympicPhase >= 1) {
				cards[cardName as keyof typeof cards].olympicPhase = 0;
			}
		});

		this.cardInfos = cards;
		// rendering
	}

	changeFestivalState(card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames>) {
		const cards = { ...this.cardInfos };
		const selected = cards[card.name];

		if (selected.isFestival === true) {
			return;
		}
		Object.keys(cards).forEach(cardName => {
			if (cardName === selected.name) {
				selected.isFestival = true;
			} else if (cards[cardName as keyof typeof cards].isFestival) {
				cards[cardName as keyof typeof cards].isFestival = false;
			}
		});

		this.cardInfos = cards;
		// rendering
	}
}
// set belonged state

export default CardsPresenter;
