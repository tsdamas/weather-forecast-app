function hourNow(response) {
  let now = new Date();
  let h2 = document.querySelector("h2.hour");
  let h3 = document.querySelector("h3.date");
  let hours = now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  h2.innerHTML = `${hours}:${minutes}`;
  h3.innerHTML = `${day}`;
}
hourNow();

function displayWeatherCondition(response) {
  document.querySelector("#search-engine").innerHTML = response.data.name;
  document.querySelector(".now-temperature").innerHTML =
    Math.round(response.data.main.temp);
  document.querySelector(".feels").innerHTML =
    Math.round(response.data.main.feels_like) + "º";
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "m/s";
  document.querySelector(".visibility").innerHTML = response.data.visibility;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#search-engine").value = response.data.name;
}

function searchCity(city) {
  let apiKey = "0581a5c52e36d81c89d13f976ae61d0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "0581a5c52e36d81c89d13f976ae61d0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");