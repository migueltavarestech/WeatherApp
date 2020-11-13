const api = {
    key: "6156b48ef3994ca6a5e130547201311",
    base: "https://api.weatherapi.com/v1",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7

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