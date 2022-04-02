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
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector(".degree").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
}

function changeCityName(event) {
  let city = document.querySelector("input#city-name");
  document.querySelector("h1").innerHTML = city.value;
  let apiKey = `7d88e39fad8e3a2f1b2d1076c46f769c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showData);
}
let searchButton = document.querySelector("button#search");
searchButton.addEventListener("click", changeCityName);

function enterCityName(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let city = document.querySelector("input#city-name");
    document.querySelector("h1").innerHTML = city.value;

    let apiKey = `7d88e39fad8e3a2f1b2d1076c46f769c`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}`).then(showData);
  }
}
let enterKey = document.querySelector("input#city-name");
enterKey.addEventListener("keypress", enterCityName);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = `7d88e39fad8e3a2f1b2d1076c46f769c`;
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${geoUrl}`).then(showData);
}
function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("button#location-dot");
locationButton.addEventListener("click", getCurrentLocation);
