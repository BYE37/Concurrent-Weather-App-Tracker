//listens for submit button click
document.addEventListener('DOMContentLoaded', (listenForLocation));

let returnWeatherInfo = {
    "apiKey": "45e0d6b421ab65e9f2cc710ebdda7e38",

    //gets location, calls fetchweatherInfo()
    getLocation: function(){
        document.querySelector(".name").classList.remove("error-message");
        document.querySelector(".weather").classList.add("loading-info");
        returnWeatherInfo.fetchWeatherInfo(document.querySelector(".search-bar").value);
    },
    
    //creates a weatherInfo.json object
    fetchWeatherInfo: async function(cityName) {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=imperial`);
        
        //calls displayWeather() or returns error
        if (response.ok) {
            const weatherData = await response.json();
            this.displayWeather(weatherData);
        } else {
            document.querySelector(".weather").classList.remove("loading-info");
            document.querySelector(".weather").classList.add("error");
            document.querySelector(".name").classList.add("error-message");
            document.querySelector(".name").innerHTML = "Error: " + response.status +" <br>Try entering again."
        }
    },

    //displays weather info
    displayWeather: function(weatherData) {
        const {name} = weatherData;
        const {icon, description} = weatherData.weather[0];
        const {temp, humidity} = weatherData.main;
        const {speed} = weatherData.wind;
        document.querySelector(".name").innerText = name;
        document.querySelector(".temp").innerText = temp + "°F"
        document.querySelector(".desc").innerText = description;
        document.querySelector(".humidity").innerText = humidity +"% humidity";
        document.querySelector(".wind").innerText = speed + " mph";
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector(".weather").classList.remove("loading-info", "error");
    },
}

//sets initial value (London)
returnWeatherInfo.fetchWeatherInfo("New York City");


//executes getLocation() when called
function listenForLocation() {
    document
    .querySelector(".search-icon")
    .addEventListener("click", returnWeatherInfo.getLocation);

    document
    .querySelector(".search-bar")
    .addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            returnWeatherInfo.getLocation();
        }
    });
}