const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector("#filter");
const searchByName = document.querySelector(".search-container input");
let allData;
const darkMode = document.querySelector(".dark-mode");
const body = document.querySelector("body");

darkMode.addEventListener("click", () => {
  body.classList.toggle("dark");
});

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(renderCountriesList);
});
// Fetch all countries on initial load
fetch(`https://restcountries.com/v3.1/all`)
  .then((res) => res.json())
  .then((data) => {
    renderCountriesList(data);
    allData = data;
    console.log(allData);
  });

searchByName.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase();
  const filteredCountries = allData.filter((country) =>
    country.name.common.toLowerCase().includes(inputValue)
  );
  renderCountriesList(filteredCountries);
});

function renderCountriesList(data) {
  countriesContainer.innerHTML = ""; // Clear previous content
  data.forEach((countries) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");

    countryCard.href = `http://127.0.0.1:3000/Front-end-mentor-projects/rest-countries-api-with-color-theme-switcher-master/rest-countries-api-with-color-theme-switcher-master/country.html?name=${encodeURIComponent(
      countries.name.common
    )}`;

    countryCard.innerHTML = `
        <img src="${countries.flags.svg}" alt="flag">
        <div class="card-details">
          <h3>${countries.name.common}</h3>
          <p><b>Population: </b>${countries.population.toLocaleString(
            "en-IN"
          )}</p>
          <p><b>Region: </b>${countries.region}</p>
          <p><b>Capital: </b>${countries.capital}</p>
        </div>
      `;

    countriesContainer.append(countryCard);
  });
}
