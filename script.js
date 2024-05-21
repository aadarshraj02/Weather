const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const ApiKey = "8f6200216e7a219e044fb1179fea87b6";
const WeatherCardsDiv = document.querySelector(".weather-cards");
const currentWeatherDiv = document.querySelector(".current-weather");

searchButton.addEventListener("click", getCityCoordinates);

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    return `<div class="details">
    <h3>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
    <h6>Temp: ${weatherItem.main.temp - (273.15).toFixed(2)}°C</h6>
    <h6>Wind: ${weatherItem.wind.speed}</h6>
    <h6>Humidity: ${weatherItem.main.humidity}</h6>
    <div class= icon">
    <img src="https://openweathermap.org/img/wn/${
      weatherItem.weather[0].icon
    }@2x.png" alt="" />
    <h6>${weatherItem.weather[0].description}</h6>
  </div>`;
  } else {
    return `
    <li class="card">
      <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
      <img src="https://openweathermap.org/img/wn/${
        weatherItem.weather[0].icon
      }@2x.png" alt="" />
      <h6>Temp: ${weatherItem.main.temp - (273.15).toFixed(2)}°C</h6>
      <h6>Wind: ${weatherItem.wind.speed}</h6>
      <h6>Humidity: ${weatherItem.main.humidity}</h6>
    </li>
    `;
  }
};

async function getCityCoordinates() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert("CITY NAME IS EMPTY");
    return;
  }
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${ApiKey}`;
  const response = await fetch(API_URL);
  const data = await response.json();
  const { name, lat, lon } = data[0];
  getWeatherDetails(name, lat, lon);
}

const getWeatherDetails = async (cityName, lat, lon) => {
  const uniqueForecastDays = [];
  const Weather_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
  const response = await fetch(Weather_API_URL);
  const data = await response.json();
  const fiveDaysForecast = data.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
    if (!uniqueForecastDays.includes(forecastDate)) {
      return uniqueForecastDays.push(forecastDate);
    }
  });
  cityInput.value = "";
  WeatherCardsDiv.innerHTML = "";
  currentWeatherDiv.innerHTML = "";

  //   console.log(fiveDaysForecast);
  fiveDaysForecast.forEach((weatherItem, index) => {
    if (index === 0) {
      currentWeatherDiv.insertAdjacentHTML(
        "beforeend",
        createWeatherCard(cityName, weatherItem, index)
      );
    } else {
      WeatherCardsDiv.insertAdjacentHTML(
        "beforeend",
        createWeatherCard(cityName, weatherItem, index)
      );
    }
  });
};
