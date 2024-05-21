const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const ApiKey = "8f6200216e7a219e044fb1179fea87b6";

searchButton.addEventListener("click", getCityCoordinates);

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
  console.log(fiveDaysForecast);
};
