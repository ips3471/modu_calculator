import styled from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		basicWidth: string;

		color: {
			main: string;
			sub: string;
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
