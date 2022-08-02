import { useState, useEffect } from 'react';

import './App.css';
import CardWeather from './components/CardWeather';

function App() {
	const [coords, setCoords] = useState();

	useEffect(() => {
		const succes = (pos) => {
			const latlon = {
				lat: pos.coords.latitude,
				lon: pos.coords.longitude,
			};
			setCoords(latlon);
		};
		navigator.geolocation.getCurrentPosition(succes);
	}, []);

	return (
		<div className='App'>
			<CardWeather lon={coords?.lon} lat={coords?.lat} />
		</div>
	);
}

export default App;

