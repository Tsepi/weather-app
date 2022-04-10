let currentDate = new Date();

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekdays = [
  "Sunday",
  "Moday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekdays[currentDate.getDay()];

function changeTime(currentDate) {
  document.querySelector("#day-time").innerHTML = `${day} ${hours}:${minutes}`;
}
changeTime();

function showData(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector(".degree").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
}

let apiKey = `7d88e39fad8e3a2f1b2d1076c46f769c`;
let city = document.querySelector("input#city-name");

function search() {
  let defualtCity = document.querySelector("h1").innerText;
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${defualtCity}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrlSearch}`).then(showData);
}
function changeCityName(event) {
  document.querySelector("h1").innerHTML = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showData);
}
let searchButton = document.querySelector("button#search");
searchButton.addEventListener("click", changeCityName);
search();

function enterCityName(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("h1").innerHTML = city.value;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showData);
  }
}
let enterKey = document.querySelector("input#city-name");
enterKey.addEventListener("keypress", enterCityName);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${geoUrl}`).then(showData);
}
function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("button#location-dot");
locationButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector(".degree").innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector(".degree");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let farenheitLink = document.querySelector("#fahrenheit");
farenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
