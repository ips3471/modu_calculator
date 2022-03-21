import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import {
	CardInfo,
	BuildOptions,
	ExecutingStates,
	NormalCityNames,
	VacationSpotNames,
	ConstructionIcon,
	ConstructionName,
} from '../../assets/interfaces/interfaces';
import ConstructionsPresenter from '../../presenter/constructions/constructions';
import ButtonComponent from '../button';

const Container = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 7em;
	padding: 1.4em;
	.true {
		opacity: 1;
	}
	.false {
		opacity: 0.6;
	}
`;

type ConstructionProps = {
	card: CardInfo<NormalCityNames> | CardInfo<VacationSpotNames> | null;
	constructions: ExecutingStates<BuildOptions>;
	setConstruction: React.Dispatch<SetStateAction<ExecutingStates<BuildOptions>>>;
	constructionsPresenter: ConstructionsPresenter;
};

function SelectConstructions({
	card,
	constructions,
	setConstruction,
	constructionsPresenter,
}: ConstructionProps) {
	function renderButtonComponent(
		iconId: ConstructionIcon,
		dataName: BuildOptions,
		displayName: ConstructionName,
	) {
		const isSelectedToString = constructions[dataName].toString() as 'true' | 'false';

		function callbackSelector() {
			if (constructions[dataName]) {
				return constructionsPresenter.toggleState(dataName, setConstruction);
			} else if (card?.isVacationSpot === true || dataName === 'landmark') {
				return constructionsPresenter.disableStatesExcept(
					dataName,
					setConstruction,
				);
			} else {
				return constructionsPresenter.disableStatesExcept(
					dataName,
					setConstruction,
					'landmark',
				);
			}
		}
		return (
			<ButtonComponent
				className={isSelectedToString}
				icon={<i className={'fas fa-' + iconId}></i>}
				name={displayName}
				callback={() => callbackSelector()}
			/>
		);
	}

	return (
		<Container>
			{card?.isVacationSpot ? (
				<>
					{renderButtonComponent('flag', 'flag', '땅')}
					{renderButtonComponent('archway', 'parasol', '파라솔')}
					{renderButtonComponent('landmark', 'bangalore', '방갈로')}
				</>
			) : (
				<>
					{renderButtonComponent('flag', 'land', '땅')}
					{renderButtonComponent('store', 'villa', '별장')}
					{renderButtonComponent('building', 'building', '빌딩')}
					{renderButtonComponent('hotel', 'hotel', '호텔')}
					{renderButtonComponent('mosque', 'landmark', '랜드마크')}
				</>
			)}
		</Container>
	);
}

export default SelectConstructions;
