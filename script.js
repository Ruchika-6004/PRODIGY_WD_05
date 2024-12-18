const apiKey = '7751e54b3f3a69cdcd5fa830750959b7';

function getWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherInfo = document.getElementById('weatherInfo');

    if (navigator.geolocation && !location) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`lat=${lat}&lon=${lon}`);
        });
    } else if (location) {
        fetchWeatherData(`q=${location}`);
    } else {
        weatherInfo.innerHTML = 'Please enter a location or allow location access.';
    }
}

function fetchWeatherData(query) {
    const weatherInfo = document.getElementById('weatherInfo');
    fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                weatherInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                weatherInfo.innerHTML = 'Location not found.';
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = `Error fetching weather data: ${error.message}`;
        });
}
