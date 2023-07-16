function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  weatherType.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  tempElement.innerHTML = temperature;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value.trim().toLowerCase();
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentCityForm = document.querySelector("#current-location");
currentCityForm.addEventListener("click", currentCity);

let cityElement = document.getElementById("city");
let weatherType = document.getElementById("weather-type");
let tempElement = document.getElementById("temperature");
let windElement = document.getElementById("wind");
let humidityElement = document.getElementById("humidity");
let weatherIconElement = document.getElementById("weather-icon");

searchCity("Addis Ababa");
