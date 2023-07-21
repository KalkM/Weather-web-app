function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let theDate = date.getDate();

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];

  return `${day}, ${month} ${theDate} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let timeZone = response.data.timezone / 3600;
  weatherType.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  celsiusTemperature = response.data.main.temp;
  dateElement.innerHTML = formatDate(
    (response.data.dt + response.data.timezone - 10800) * 1000
  );
  if (timeZone < 0) timeZoneElement.innerHTML = `GMT ${timeZone}`;
  else timeZoneElement.innerHTML = `GMT + ${timeZone}`;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(event) {
  event.preventDefault();
  let city = document.getElementById("city-input").value.trim().toLowerCase();
  searchCity(city);
}

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", search);

let currentCityForm = document.getElementById("current-location");
currentCityForm.addEventListener("click", currentCity);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let cityElement = document.getElementById("city");
let dateElement = document.getElementById("date");
let weatherType = document.getElementById("weather-type");
let tempElement = document.getElementById("temperature");
let weatherIconElement = document.getElementById("weather-icon");
let windElement = document.getElementById("wind");
let humidityElement = document.getElementById("humidity");
let timeZoneElement = document.getElementById("time-zone");

searchCity("Addis Ababa");
