import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import LoadingScree from './LoadingScree';

const CardWeather = ({ lat, lon }) => {
	const [weather, setWeather] = useState();
	const [temperture, setTemperture] = useState();
	const [isCelsius, setIsCelsius] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (lat) {
			const APIKey = '8d4f7eb054c95ea91e90772c57386a69';
			const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

			axios
				.get(URL)
				.then((res) => {
					setWeather(res.data);
					const temp = {
						celsius: `${Math.round(res.data.main.temp - 273.15)} ºC`,
						farenheit: `${
							Math.round((res.data.main.temp - 274.15) * 9) / 5 + 32
						} ºF`,
					};
					setTemperture(temp);
					setIsLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [lat, lon]);

	const handleClick = () => setIsCelsius(!isCelsius);

	if (isLoading) {
		return <LoadingScree />;
	} else {
		return (
			<article className='weather__container'>
				<h1>Weather App</h1>
				<h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
				<div className='weather__card'>
					<div>
						<img
							src={
								weather &&
								`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
							}
							alt=''
						/>
						<h2 className='celsius'>
							{isCelsius ? temperture?.celsius : temperture?.farenheit}
						</h2>
					</div>
					<div>
						<h3>&#34;{weather?.weather[0].description}&#34;</h3>
						<ul>
							<li>
								<i className='fa-solid fa-wind'></i>
								<span> Wind Speed : </span>
								{weather?.wind.speed} m/s
							</li>
							<li>
								<i class='fa-solid fa-cloud'></i>
								<span>Clouds </span>
								{weather?.clouds.all} %
							</li>
							<li>
								<i class='fa-solid fa-temperature-high'></i>
								<span>Pressure</span> {weather?.main.pressure} hPa
							</li>
						</ul>
					</div>
				</div>

				<button onClick={handleClick} className='btn'>
					{isCelsius ? 'change to ºF' : 'change to ºC'}
				</button>
			</article>
		);
	}
};

export default CardWeather;
