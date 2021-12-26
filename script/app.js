function formatDate(now) {
  let currentDate = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = now.getDay();
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

  let monthIndex = now.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "Mai",
    "June",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];

  return `${day}, ${month} ${currentDate}.<br /> ${hours}:${minutes}`;
}

let now = new Date();
let dateElement = document.querySelector("h2");
dateElement.innerHTML = formatDate(now);

function showWeatherConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#converted-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c37526e7df4d92dc9f8f999d7f534bb7";
  let endPoint = "https://api.openweathermap.org";
  let units = "metric";
  let apiUrl = `${endPoint}/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

searchCity("Colmar");
