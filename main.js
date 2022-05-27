const api = {
	key: "821ef110a228e43078fe3662715f3e74",
	base: "https://api.openweathermap.org/data/2.5/",
	}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

	function setQuery(event) 
	{
		if(event.keyCode == 13)
		{
			getResults(searchbox.value);
			console.log(searchbox.value);
		}
	}

	function getResults (city)
	{
		fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
		.then(weather => 
		{
			return weather.json();
		})
		.then(displayResults);
	}

	function displayResults (weather)
	{
		
		let city = document.querySelector('.location .city');
		city.innerText = `${weather.name}`;
		/*console.log(weather);*/

		let now = new Date();
		let date = document.querySelector('.location .date');
		date.innerText = dateBuilder(now);

		let temp = document.querySelector('.current .degrees');
		temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

		let weather_el = document.querySelector('.current .weather');
		weather_el.innerText = weather.weather[0].main;

		let hilow = document.querySelector('.current .range');
		hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
	}

	function dateBuilder (d)
	{
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return day + " " + date + " " + month + " " + year;
	}

