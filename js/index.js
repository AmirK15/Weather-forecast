const form = document.getElementById('form')
const btn = document.getElementById('btn')
const regionCity = document.querySelector('.regionCity')
const nameCity = document.querySelector('.nameCity')
const tempCity = document.querySelector('.tempCity')
const weatherCity = document.querySelector('.weatherCity')
const img1 = document.querySelector('.img1')
const humidityCity = document.querySelector('.humidityCity')
const speedCity = document.querySelector('.speedCity')
const pressureCity = document.querySelector('.pressureCity')
const visibilityCity = document.querySelector('.visibilityCity')
const sunriseCity = document.querySelector('.sunriseCity')
const sunsetCity = document.querySelector('.sunsetCity')
const input = document.querySelector('.inputText')


btn.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.info-title').classList.add('open-info')
    document.querySelector('.title').classList.add('open-info')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=0d54e2c99f5135987d576129179b6bf1`)
        .then((res) => res.json())
        .then((resolve) => {
            console.log(resolve)
            regionCity.textContent = `${resolve.sys.country}`
            nameCity.textContent = `${resolve.name}`
            tempCity.textContent = `${Math.round(resolve.main.temp)-273}°C`
            weatherCity.textContent = `${resolve.weather[0].main}`
            if (resolve.weather[0]["main"] === "Clouds") {
                weatherCity.textContent = "Облачно";
            } else if (resolve.weather[0]["main"] === "Clear") {
                weatherCity.textContent = "Ясное небо";
            } else if (resolve.weather[0]["main"] === "Rain") {
                weatherCity.textContent = "Дождь";
            } else if (resolve.weather[0]["main"] === "Snow") {
                weatherCity.textContent = "Снег";
            } else if (resolve.weather[0]["main"] === "Thunderstorm") {
                weatherCity.textContent = "Гроза";
            } else if (resolve.weather[0]["main"] === "Drizzle") {
                weatherCity.textContent = "Мелкий дождь";
            } else if (resolve.weather[0]["main"] === "Mist") {
                weatherCity.textContent = "Туман";
            } else if (resolve.weather[0]["main"] === "Haze") {
                weatherCity.textContent = "Мгла";
            } else if (resolve.weather[0]["main"] === "Fog") {
                weatherCity.textContent = "Туман";
            } else {
                weatherCity.textContent = resolve.weather[0]["main"];
            }
            img1.src = `http://openweathermap.org/img/wn/${resolve.weather[0]["icon"]}@2x.png`;
            humidityCity.textContent = `${resolve.main.humidity}%`
            speedCity.textContent = `${resolve.wind.speed} м/с`
            pressureCity.textContent = `${resolve.main.pressure} Па`
            visibilityCity.textContent = `${resolve.visibility / 1000} км`
            // let date = new Date (resolve.sys.sunrise * 1000)
            // let hour = date.getHours()
            // let minutes = date.getMinutes()
            // let seconds = date.getSeconds()
            // sunriseCity.textContent = `${hour} : ${minutes} : ${seconds}`
            let date = new Date(resolve.sys.sunrise * 1000)
            sunriseCity.textContent = date.toLocaleTimeString()
            let date1 = new Date(resolve.sys.sunset * 1000)
            sunsetCity.textContent = date1.toLocaleTimeString()
        })
        .catch((err) => {
            input.placeholder = 'Неверное название'
            input.value = ''
            input.classList.add('error')
        })
})
