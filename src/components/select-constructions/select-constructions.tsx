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
					{renderButtonComponent('flag', 'flag', 'λ')}
					{renderButtonComponent('archway', 'parasol', 'νλΌμ')}
					{renderButtonComponent('landmark', 'bangalore', 'λ°©κ°λ‘')}
				</>
			) : (
				<>
					{renderButtonComponent('flag', 'land', 'λ')}
					{renderButtonComponent('store', 'villa', 'λ³μ₯')}
					{renderButtonComponent('building', 'building', 'λΉλ©')}
					{renderButtonComponent('hotel', 'hotel', 'νΈν')}
					{renderButtonComponent('mosque', 'landmark', 'λλλ§ν¬')}
				</>
			)}
		</Container>
	);
}

export default SelectConstructions;
