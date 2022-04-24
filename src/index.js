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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
function displayForcast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2 week">
            ${formatDay(forecastDay.dt)} <br />
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="Rainy" width="42" ">
            <span class="mid"> 
              <span class="high">${Math.round(forecastDay.temp.max)}°</span>/
              <span class="low">${Math.round(forecastDay.temp.min)}°</span>
          </span>
          `;

      forecastHTML = forecastHTML + `</div>`;

      forecastElement.innerHTML = forecastHTML;
    }
  });
}
function getForecast(coordinates) {
  console.log(coordinates);

  let apiURLCoord = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURLCoord).then(displayForcast);
  console.log(apiURLCoord);
}
function showData(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;

  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector(".degree").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  console.log(response.data);

  getForecast(response.data.coord);
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
document
  .querySelector("button#search")
  .addEventListener("click", changeCityName);
search();

function enterCityName(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("h1").innerHTML = city.value;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(showData);
  }
}
document
  .querySelector("input#city-name")
  .addEventListener("keypress", enterCityName);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${geoUrl}`).then(showData);
}
function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
document
  .querySelector("button#location-dot")
  .addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector(".degree").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#fahrenheit").classList.remove("active");
  document.querySelector("#celsius").classList.add("active");
}

let celsiusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector(".degree");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  document.querySelector("#celsius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}

document
  .querySelector("#fahrenheit")
  .addEventListener("click", displayFahrenheitTemperature);

document
  .querySelector("#celsius")
  .addEventListener("click", displayCelsiusTemperature);
