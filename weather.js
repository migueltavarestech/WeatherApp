const api = {
    key: "6156b48ef3994ca6a5e130547201311",
    base: "https://api.weatherapi.com/v1",
}

const iconValue = {
    CLEARDAY: 'clear-day',
    CLEARNIGHT: '//cdn.weatherapi.com/weather/64x64/night/113.png',
    RAIN: '//cdn.weatherapi.com/weather/64x64/day/299.png',
    RAIN_2: '//cdn.weatherapi.com/weather/64x64/day/305.png',
    RAIN_3: '//cdn.weatherapi.com/weather/64x64/day/353.png',
    RAIN_4: '//cdn.weatherapi.com/weather/64x64/day/356.png',
    LIGHT_RAIN_DAY: '//cdn.weatherapi.com/weather/64x64/day/296.png',
    LIGHT_RAIN_NIGHT: '//cdn.weatherapi.com/weather/64x64/night/296.png',
    THUNDER_DAY: '//cdn.weatherapi.com/weather/64x64/day/389.png',
    THUNDER_NIGHT: '//cdn.weatherapi.com/weather/64x64/night/389.png',
    SNOW: '//cdn.weatherapi.com/weather/64x64/day/326.png',
    SLEET: 'sleet',
    WIND: 'wind',
    FOG: 'fog',
    CLOUDY: 'cloudy',
    PARTLY_CLOUDY_DAY: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    PARTLY_CLOUDY_NIGHT: '//cdn.weatherapi.com/weather/64x64/night/116.png',
    MIST_DAY: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    MIST_NIGHT: '//cdn.weatherapi.com/weather/64x64/night/116.png',
    MIST_DAY_2: '//cdn.weatherapi.com/weather/64x64/day/143.png',
    MIST_NIGHT_2: '//cdn.weatherapi.com/weather/64x64/night/143.png',
    FOG_DAY: '//cdn.weatherapi.com/weather/64x64/day/248.png',
    FOG_NIGHT: '//cdn.weatherapi.com/weather/64x64/night/248.png'
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}/forecast.json?key=${api.key}&q=${query}&days=7`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location');
    city.innerText = `${weather.location.name}, ${weather.location.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.current.temp_c)}<span>&deg;c</span>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = `${weather.current.condition.text}`;

    let hilow = document.querySelector('.feelsLike');
    hilow.innerText = `Feels Like ${Math.round(weather.current.feelslike_c)}°c`;

    let humidity = document.querySelector('.humidity');
    humidity.innerText = `Humidity ${weather.current.humidity}%`;

    let rain = document.querySelector('.rain');
    rain.innerText = `Chance Of Rain ${weather.forecast.forecastday[0].day.daily_chance_of_rain}%`;

    let wind = document.querySelector('.wind');
    wind.innerText = `Wind ${weather.current.gust_mph}mph`;

    document.getElementById('weatherIcon').src = getICON(weather.current.condition.icon);

    // render the forecast tabs
    document.getElementById('dailyForecast').innerHTML = renderDailyRow(weather);
    document.getElementById('weeklyForecast').innerHTML = renderWeeklyRow(weather);
    document.getElementById("dailyForecast").style.overflow = "scroll";
    
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function getICON(icon) {
    switch(icon) {
        case iconValue.CLEARDAY:
            return 'images/SunnyDay.png';
        case iconValue.MIST_DAY:
        case iconValue.MIST_DAY_2:
        case iconValue.PARTLY_CLOUDY_DAY:
            return 'images/MostlySunny.png';
        case iconValue.CLEARNIGHT:
            return 'images/ClearMoon.png';
        case iconValue.MIST_NIGHT:
        case iconValue.MIST_NIGHT_2:
        case iconValue.FOG_DAY:
        case iconValue.FOG_NIGHT:
        case iconValue.PARTLY_CLOUDY_NIGHT:
            return 'images/CloudyMoon.png';
        case iconValue.RAIN:
        case iconValue.RAIN_2:
        case iconValue.RAIN_3:
        case iconValue.RAIN_4:
        case iconValue.LIGHT_RAIN_DAY:
        case iconValue.LIGHT_RAIN_NIGHT:
        case iconValue.THUNDER_DAY:
        case iconValue.THUNDER_NIGHT: 
            return 'images/Rain.png';
        case iconValue.SNOW:
            return 'images/Snow.png';
        case iconValue.SLEET:
            return 'images/Sleet.png';
        default:
            return 'images/SunnyDay.png';
    }
}

function renderWeeklyRow(weather) {
    var resultsHTML = "<tr><th>Day</th><th>Conditions</th><th>Hi</th><th>Lo</th></tr>";
    for (i=0; i<3; i++) {
        let dayTime = `${weather.forecast.forecastday[i].date}`;
        let summary = `${weather.forecast.forecastday[i].day.condition.text}`;
        let tempHigh = `${weather.forecast.forecastday[i].day.maxtemp_c}`;
        let tempLow = `${weather.forecast.forecastday[i].day.mintemp_c}`;

        resultsHTML += `<tr><td>${dayTime}</td><td>${summary}</td><td>${tempHigh}</td><td>${tempLow}</td><tr>`
    }
    return resultsHTML
}

function renderDailyRow(weather) {
    var resultsHTML = "<tr><th>Time</th><th>Conditions</th><th>Temp</th><th>Precip</th></tr>";
    for (i=1; i<24; i+=2) {
        let time = `${weather.forecast.forecastday[0].hour[i].time}`;
        time = time.substr(time.length - 5)
        let condition = `${weather.forecast.forecastday[0].hour[i].condition.text}`;
        let temp = `${Math.round(weather.forecast.forecastday[0].hour[i].temp_c)}`;
        let precip = `${weather.forecast.forecastday[0].hour[i].chance_of_rain}`;

        resultsHTML += `<tr><td>${time}</td><td>${condition}</td><td>${temp}&deg;c</td><td>${precip}%</td><tr>`
    }
    return resultsHTML
}