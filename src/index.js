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

  return `${day}, ${month} ${theDate}, ${hours}:${minutes}`;
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

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  weatherType.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = temperature;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  sunriseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function weather(position) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    axios.get(apiUrl).then(displayWeather);
  }

  function error() {
    cityElement.innerHTML = "Unable to retrieve your location";
  }

  cityElement.innerHTML = "Locating...";
}

let cityElement = document.getElementById("city");
let dateElement = document.getElementById("date");
let weatherType = document.getElementById("weather-type");
let tempElement = document.getElementById("temperature");
let windElement = document.getElementById("wind");
let humidityElement = document.getElementById("humidity");
let weatherIconElement = document.getElementById("weather-icon");
let sunriseElement = document.getElementById("sunrise");
let sunsetElement = document.getElementById("sunset");

displayWeather();
