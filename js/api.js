
const cada3num = (a) => {
    const numbers = a
    const devuelvo = []
    for (let i = 0; i < numbers.length; i += 3) {
        devuelvo.push(numbers[i]);
    }
    return devuelvo
}

const TempForDay = (temps) => {
    const arrayOriginal = temps;
    const subArrays = [];
    for (let i = 0; i < 7; i++) {
        const subArray = [];
        for (let j = 0; j < 24; j++) {
            const index = i * 24 + j;
            subArray.push(arrayOriginal[index]);
        }
        subArrays.push(subArray);
    }

    const numerosMasAltos = [];
    const numerosMasBajo = [];
    for (let i = 0; i < subArrays.length; i++) {
        const numeroMasAlto = Math.floor(Math.max(...subArrays[i]));
        const numeroMasBajo = Math.floor(Math.min(...subArrays[i]));
        numerosMasAltos.push(numeroMasAlto);
        numerosMasBajo.push(numeroMasBajo);
    }
    writeDaysWeek(numerosMasAltos, numerosMasBajo)
}

const tempHrs = {
    labels: ["00", "03", "06", "09", "12", "15", "18", "21"],
    datasets: [{
        data: [],
        fill: true,
        backgroundColor: "#424949",
        borderColor: "rgb(230, 215, 30,0.7)",
        borderWidth: 2

    }],

};

const options = {
    scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 50,
            display: false

        },
        x: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },


    }
};

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
    type: "line",
    data: tempHrs,
    options: options,

});




function obtenerClima(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,rain,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours,windspeed_10m_max&current_weather=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            TempForDay(data.hourly.temperature_2m)
            const grafica = cada3num(data.hourly.temperature_2m.slice(0, 23))

            tempHrs.datasets[0].data = grafica;
            myChart.update();
           
            writeSunrise(data)
            writeSunset(data)
            writeWind(data)
            writeHumidity(data)
            writeDays(data)
            cambioImgs(data.current_weather.weathercode)
            cityResults.style.display = 'none';
            document.getElementById("divChart").classList.remove('none')
        })
        .catch(error => console.error(error));
}



const writeSunrise = (datos) => {
    const sunriseT = document.getElementById("hrSunrise")
    sunriseT.innerHTML = ""
    const sunriseDate = new Date(datos.daily.sunrise[0]);
    const sunriseTime = sunriseDate.toLocaleDateString([], { hour: "2-digit", minute: "2-digit" })
    const dateTimeString = sunriseTime;
    const [dateString, timeString] = dateTimeString.split(", ");
    sunriseT.innerHTML = timeString


}

const writeSunset = (datos) => {
    const SunsetText = document.getElementById("SunsetText")
    SunsetText.innerHTML = ""
    const sunsetDate = new Date(datos.daily.sunset[0]);
    const sunsetTime = sunsetDate.toLocaleDateString([], { hour: "2-digit", minute: "2-digit" })
    const dateTimeString = sunsetTime;
    const [dateString, timeString] = dateTimeString.split(", ");
    SunsetText.innerHTML = timeString


}

const writeWind = (datos) => {
    const windText = document.getElementById("windText")
    windText.innerHTML = ""
    const wind = datos.current_weather.windspeed
    windText.innerHTML = Math.floor(wind) + "km/h"
}

const writeHumidity = (datos) => {
    const humidityText = document.getElementById("humidityText")
    humidityText.innerHTML = ""
    humidityText.innerHTML = datos.hourly.relativehumidity_2m[0] + "%"
}


const writeDays = (datos) => {
    const daysText = document.getElementById("temp_bg")
    daysText.innerHTML = ""
    const grados = datos.current_weather.temperature
    daysText.innerHTML = Math.floor(grados) + "°"
}

const obtenerNombre = (nameCity) => {
    const cityName = document.getElementById("cityName")
    cityName.innerHTML = "";
    cityName.innerHTML = nameCity;
}



const writeDaysWeek = (tempsMin, tempsMax, icon) => {

    const daysDiv = document.querySelector('.days');
    daysDiv.innerHTML = '';

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date().getDay();

    for (let i = 0; i < daysOfWeek.length; i++) {
        const dayIndex = (today + i) % daysOfWeek.length;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const dayOfWeekSpan = document.createElement('span');
        dayOfWeekSpan.textContent = daysOfWeek[dayIndex];
        dayDiv.appendChild(dayOfWeekSpan);


        const tempSpan = document.createElement('span');
        tempSpan.textContent = `${tempsMin[i]}°`;
        tempSpan.classList.add('max');
        dayDiv.appendChild(tempSpan);

        const tempSpan2 = document.createElement('span');
        tempSpan2.textContent = `${tempsMax[i]}°`;
        tempSpan2.classList.add('min');
        dayDiv.appendChild(tempSpan2);
        daysDiv.appendChild(dayDiv);
    }
}
