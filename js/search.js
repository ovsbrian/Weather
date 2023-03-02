const apiUrl = "https://api.open-meteo.com/v1/forecast";
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityResults = document.getElementById("city-results");


const buscarCiudad = (cityName) => {
  const city = cityName;
  const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo completar la solicitud.");
      }
      return response.json();
    })
    .then(data => {
      if (data.length === "") {
        console.log(`No se encontraron resultados para ${city}.`);
        clearResults();
      } else {
        clearResults();
        const cities = filterCities(data);
        const liElements = createLiElements(cities);
        appendLiElements(liElements);
      }
    })
    .catch(error => {
      console.error(error.message);
    });
}

const clearResults = () => {
  cityResults.innerHTML = "";
};

const filterCities = (data) => {
  return data.filter(city => city.display_name !== undefined);
};

const createLiElements = (cities) => {
  return cities.map(city => {
    const li = document.createElement("li");
    const infoCity = city.display_name;
    const lat = city.lat;
    const lon = city.lon;
    const arrName = infoCity.split(",");
    const nameCity = arrName[0];
    const nameCountry = arrName[arrName.length - 1];
    const nameDep = arrName.length > 3 ? arrName[1].substring(1) : "";
    const textVisible =  `${nameCity}${nameDep ? `, ${nameDep}` : ""},  ${nameCountry}`;
    li.textContent = textVisible
    li.classList.add("liAparece");
    li.addEventListener("click", (e) => {
      e.preventDefault();
      obtenerClima(lat, lon);
      obtenerNombre (textVisible)
    });

    return li;
  });
};

const appendLiElements = (liElements) => {
  cityResults.append(...liElements);
};



const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};



const debouncedBuscarCiudad = debounce(buscarCiudad, 500);

const cambiaValor = debounce((event) => {
  const nameCity = event.target.value.trim();
  if (nameCity) {
    cityResults.style.display = "flex";
    buscarCiudad(nameCity);
  } else {
    cityResults.style.display = "none";
  }
}, 500);

cityInput.addEventListener("input", cambiaValor);

document.addEventListener('click', function (event) {

  if (!cityResults.contains(event.target)) {
    cityResults.style.display = 'none';
  }
});
