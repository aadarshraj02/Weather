const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const ApiKey = "8f6200216e7a219e044fb1179fea87b6";

searchButton.addEventListener("click", getCityCoordinates);

function getCityCoordinates() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert("CITY NAME IS EMPTY");
    return;
  }
  const GeoCodingApiUrl = ``;
}
