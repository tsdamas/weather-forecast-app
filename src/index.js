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

function formatDay(timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

/**
 * 
 * @param {object data from API=} response 
 */    

    var jsonToSeries = (response) => {
      let forecast = response.data.daily;
      forecast.shift();
      let max = []; min = [];
      forecast.forEach(function (row) {
        //add either to days, max and min
        max.push({ x: (formatDay(row.dt)), y: Math.round(row.temp.max) });
        min.push({ x: (formatDay(row.dt)), y: -Math.round((row.temp.min)) });
      });
      var series = [{ name: 'Min', points: min }, { name: 'Max', points: max }];
      renderChart(series); 
      displayHourly(response); 

    };

/**
 * 
 * @param {array} series 
 */    
    
    function renderChart(series){
      JSC.Chart ('chartDiv', {
        debug: true, 
        type: 'horizontal column solid', 
       legend: {
        position: 'bottom',
        template: '%icon,%name',
        },
        chartArea: {
          fill: false,
          opacity: 0.01
        },
      xAxis: {  
        staticColumnWidth: 20,
        defaultTick: { 
        gridLine_visible: false, 
        placement: 'outside',
        label_offset: "%yValueºC"

      }
        },
      yAxis: { 
        visible: false,
        label:{
          placement: "outside", 
        },
        scale: { 
        type: "stacked", 
        range: [-15, 25]
        
      }, 
    },
      palette:[
        "#D2E4F7",
        "#EC6E4C"
      ],  
      chartArea_fill: false,
      series: series
       });
    }
    renderChart(); 

function formatAMPM(UNIX_timestamp) {
  let date = new Date(UNIX_timestamp * 1000);
  return date.toLocaleString('en-US', { 
    hour: 'numeric', 
    hour12: true 
  });
}

function displayHourly (response){
  let hourlyElement = document.querySelector("#hourly");

  let hourlyHTML =
  `<div class="row row-bottom">
  <div class="col-sm-12">
    <div class="row row-bottom-1">
      <div class="col-bottom-1 col-sm-2">
        <p class="hour1">
          ${formatAMPM(response.data.hourly[0].dt)}
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="hour2">
          ${formatAMPM(response.data.hourly[1].dt)}
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="hour3">
          ${formatAMPM(response.data.hourly[2].dt)}
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="hour3">
          ${formatAMPM(response.data.hourly[3].dt)}
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="hour4">
          ${formatAMPM(response.data.hourly[4].dt)}
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="hour5">
          ${formatAMPM(response.data.hourly[5].dt)}
        </p>
      </div>
    </div>
    <div class="row row-bottom-2">
      <div class="col-bottom-2 col-sm-2">
        <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[0].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-2 col-sm-2">
        <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[1].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-3 col-sm-2">
         <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[2].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-4 col-sm-2">
         <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[3].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-5 col-sm-2">
         <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[4].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
      <div class="col-bottom-6 col-sm-2">
        <img 
      src ="http://openweathermap.org/img/wn/${response.data.hourly[5].weather[0].icon}@2x.png"
      alt=""
      width="45" 
      />
      </div>
    </div>
    <div class="row row-bottom-3">
      <div class="col-bottom-3 col-sm-2">
        <p class="first-hour-temperature">
          ${Math.round(response.data.hourly[0].temp)}º
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="temper2">
           ${Math.round(response.data.hourly[1].temp)}º
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="temper3">
           ${Math.round(response.data.hourly[2].temp)}º
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="temper4">
           ${Math.round(response.data.hourly[3].temp)}º
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="temper5">
           ${Math.round(response.data.hourly[3].temp)}º
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="temper6">
           ${Math.round(response.data.hourly[4].temp)}º
        </p>
      </div>
    </div>
    <div class="row row-bottom-4">
      <div class="col-bottom-4 col-sm-2">
        <p class="feels1">
          Feels ${Math.round(response.data.hourly[0].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="feels2">
          Feels ${Math.round(response.data.hourly[1].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="feels2">
          Feels ${Math.round(response.data.hourly[2].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="feels3">
          Feels ${Math.round(response.data.hourly[3].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="feels4">
          Feels ${Math.round(response.data.hourly[4].feels_like)}º
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="feels5">
          Feels ${Math.round(response.data.hourly[5].feels_like)}º
        </p>
      </div>
    </div>
    <div class="row row-bottom-5">
      <div class="col-bottom-5 col-sm-2">
        <p class="prep1">
          ${response.data.hourly[0].humidity}%
        </p>
      </div>
      <div class="col-bottom-2 col-sm-2">
        <p class="prep2">
          ${response.data.hourly[1].humidity}%
        </p>
      </div>
      <div class="col-bottom-3 col-sm-2">
        <p class="prep2">
          ${response.data.hourly[2].humidity}%
        </p>
      </div>
      <div class="col-bottom-4 col-sm-2">
        <p class="prep3">
          ${response.data.hourly[3].humidity}%
        </p>
      </div>
      <div class="col-bottom-5 col-sm-2">
        <p class="prep4">
          ${response.data.hourly[4].humidity}%
        </p>
      </div>
      <div class="col-bottom-6 col-sm-2">
        <p class="prep5">
          ${response.data.hourly[5].humidity}%
        </p>
      </div>
    </div>
  </div>
</div>
</div>
`;
  hourlyElement.innerHTML = hourlyHTML;
}

// fetching data chart 
  function getForecast(coordinates){
  let apiKey ="0581a5c52e36d81c89d13f976ae61d0c"
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(jsonToSeries, renderChart); 
}

function displayWeatherCondition(response) {
  document.querySelector("#search-engine").innerHTML = response.data.name;
  document.querySelector(".now-temperature").innerHTML =
    Math.round(celsiusTemperature);
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description)
  
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);

}

function searchCity(city) {
  let apiKey = "0581a5c52e36d81c89d13f976ae61d0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition, jsonToSeries);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "0581a5c52e36d81c89d13f976ae61d0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition, jsonToSeries);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    searchLocation);
}

function displayFahrenheitTemperature (event) {
event.preventDefault();
let temperatureElement = document.querySelector(".now-temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature); 
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active"); 
  let temperatureElement = document.querySelector(".now-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link"); 
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature); 

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Vancouver");

