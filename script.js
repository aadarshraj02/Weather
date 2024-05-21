const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

searchButton.addEventListener("click", getCityCoordinates);

function getCityCoordinates() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert("CITY NAME IS EMPTY");
    return;
  }

  console.log(cityName);
}
