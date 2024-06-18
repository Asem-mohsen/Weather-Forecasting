const ApiKey = 'fff10993868a4229a64105729241806';

let search = document.getElementById('searchInput');
    search.addEventListener('click', function() {
        if (search.value.trim() === "") {
            search.value == "Cairo"
            return;
        }
        fetchWeatherData(search.value)
    });

    function fetchWeatherData(location) {
        const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${location}&days=3&aqi=yes&alerts=no`;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", baseURL, true);

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                updateWeather(response);
            } else if (this.readyState == 4) {
                alert("Error fetching weather data");
            }
        };

        xhttp.send();
    }


    function updateWeather(data) {
        // Current weather
        document.getElementById('todayDay').textContent = new Date(data.location.localtime).toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById('todayDate').textContent = new Date(data.location.localtime).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        document.getElementById('currentLocation').textContent = data.location.name;
        document.getElementById('currentTemp').textContent = `${data.current.temp_c}°C`;
        document.getElementById('currentStatus').textContent = data.current.condition.text;
        document.getElementById('currentPrecipitation').textContent = data.current.precip_mm;
        document.getElementById('currentWind').textContent = data.current.wind_kph;
        document.getElementById('currentWindDirection').textContent = data.current.wind_dir;

        // Forecast day 1
        updateForecast(data.forecast.forecastday[1], 'forecast1');

        // Forecast day 2
        updateForecast(data.forecast.forecastday[2], 'forecast2');
    }

    function updateForecast(dayData, forecastId) {
        document.getElementById(`${forecastId}Day`).textContent = new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById(`${forecastId}Date`).textContent = new Date(dayData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        document.getElementById(`${forecastId}Location`).textContent = document.getElementById('currentLocation').textContent;
        document.getElementById(`${forecastId}Temp`).textContent = `${dayData.day.avgtemp_c}°C`;
        document.getElementById(`${forecastId}Status`).textContent = dayData.day.condition.text;
    }

    window.onload = function() {
        fetchWeatherData('Cairo');
    };