{
	type Card = {
		id: string;
		name: string;
	};
	type Cards = {
		[key: string]: Card;
	};

	const Test = () => {
		const cards: Cards = {
			'1': {
				id: '1',
				name: 'card1',
			},
			'2': {
				id: '2',
				name: 'card2',
			},
		};
		return;
		// Object.keys(cards)
		// .map(key => cards[key])
		// .map(card => <div key={card!.id} card={card}></div>);
	};
}
