const countryName = new URLSearchParams(window.location.search).get("name");
const container = document.querySelector(".container");
const pageTitle = (document.querySelector("title").innerText = countryName);
const flagImg = document.querySelector("img");
const countryNameH1 = document.querySelector(".details-text-container h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const tld = document.querySelector(".tld");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountryTags = document.querySelector(".border-countries");
const darkMode = document.querySelector('.dark-mode')
const body = document.querySelector('body')

darkMode.addEventListener('click', ()=> {
  body.classList.toggle('dark')
})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);

    countryNameH1.innerText = country.name.common;
    flagImg.src = country.flags.svg;

    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;

    tld.innerText = country.tld[0];

    if (country.subRegion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.name.nativeName) {
      const nativeNames = Object.values(country.name.nativeName);
      nativeName.innerText = nativeNames[0].common || nativeNames[0].official;
      console.log(country.name.nativeName);
    } else {
      nativeName.innerText = countryName;
    }
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then((borderCountry) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry[0].name.common;
            borderCountryTag.href = `./country.html?name=${encodeURIComponent(borderCountry[0].name.common)}&fullText=true`;
            borderCountryTags.append(borderCountryTag);
            
          });
      });
    }
  });
