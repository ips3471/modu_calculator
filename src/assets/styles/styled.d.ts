import styled from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		basicWidth: string;
		side_padding: string;
		navbar__height: string;

		color: {
			main: string;
			sub: string;
			background: string;
			card_label: {
				line1_first: string;
				line1_second: string;
				line2_first: string;
				line2_second: string;
				line3_first: string;
				line3_second: string;
				line4_first: string;
				line4_second: string;
				island1: string;
				island2: string;
			};
		};
	}
}

// export interface DefaultTheme {
//     dark: {
//       mainBackground: string;
//       // neutral color
//       title: string;
//       primaryText: string;
//       secondaryText: string;
//       disable: string;
//       border: string;
//       divider: string;
//       background: string;
//       tableHeader: string;
//     };
//     light: {
//       mainBackground: string;
//       // neutral color
//       title: string;
//       primaryText: string;
//       secondaryText: string;
//       disable: string;
//       border: string;
//       divider: string;
//       background: string;
//       tableHeader: string;
//       // point-color
//       // point-color
//     };
//     response: {};
//   }
// }
