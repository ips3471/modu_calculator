import React from 'react';
import Habits from './components/habits';
import { Navbar } from './components/navbar';

function App() {
	return (
		<>
			<Navbar />
			<Habits />
			<button onClick={() => console.log('reset')}>Reset All</button>
		</>
	);
}

export default App;
