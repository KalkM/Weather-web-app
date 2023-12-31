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

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-lg-2 col-md-4 col-sm-4 weather-forecast-data">
        <div class="weather-forecast-date ">${formatDay(forecastDay.dt)}</div>
        
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
       
          <div class="weather-forecast-temperature-max"> H: ${Math.round(
            forecastDay.temp.max
          )}° </div>
          <div class="weather-forecast-temperature-min"> L: ${Math.round(
            forecastDay.temp.min
          )}° </div>
          <div class="weather-forecast-temperature-max"> Sunrise: ${formatTime(
            (forecastDay.sunrise + response.data.timezone_offset - 10800) * 1000
          )} </div>
          <div class="weather-forecast-temperature-max"> sunset: ${formatTime(
            (forecastDay.sunset + response.data.timezone_offset - 10800) * 1000
          )} </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let timeZone = response.data.timezone / 3600;
  weatherType.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  tempElement.innerHTML = temperature;
  dateElement.innerHTML = formatDate(
    (response.data.dt + response.data.timezone - 10800) * 1000
  );
  if (timeZone < 0) timeZoneElement.innerHTML = `Timezone : GMT ${timeZone}`;
  else timeZoneElement.innerHTML = `Timezone : GMT + ${timeZone}`;

  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.getElementById("city-input").value;
  searchCity(city);
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

let searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", search);

let currentCityForm = document.getElementById("current-location");
currentCityForm.addEventListener("click", currentCity);

let cityElement = document.getElementById("city");
let dateElement = document.getElementById("date");
let timeZoneElement = document.getElementById("time-zone");
let weatherType = document.getElementById("weather-type");
let tempElement = document.getElementById("temperature");
let weatherIconElement = document.getElementById("weather-icon");

searchCity("Addis Ababa");
