import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
	basicWidth: '320px',
	side_padding: '4px',
	navbar__height: '3rem',

	color: {
		main: '#dde1ed',
		sub: '#1f4ca6',
		background: '#000000',
	},
};

const nextTheme: DefaultTheme = {
	basicWidth: '320px',
	side_padding: '1rem',
	navbar__height: '2rem',

	color: {
		main: '#1c1f25',
		sub: '#fff',
		background: '#000000',
	},
};

export { theme, nextTheme };
