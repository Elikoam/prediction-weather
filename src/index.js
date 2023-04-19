function formatDate(timestamp){
    let date = new Date (timestamp);
    let hours= date.getHours();
    if (hours<10){
    hours = `0${hours}`;
    }
    let minutes= date.getMinutes();
    if (minutes<10){
    minutes = `0${minutes}`;
    }
    let days =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday"   
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;

}

function getforcast (coordinates){
    let apikey= "34ae1065362d42545661451bda2b8a1f";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric` 
    console.log(apiUrl);
    axios.get(apiUrl).then(displayforecast);
}

function showTemperature(response){
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    
    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getforcast(response.data.coord);
}

function submit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}
function search(city) {
    let apiKey = "34ae1065362d42545661451bda2b8a1f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function showFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function showCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature= null;

let form =document.querySelector("#search-city");
form.addEventListener("submit", submit);

let fahrenheitlink=document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemperature);

let celsiuslink=document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemperature);

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days =[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"   
    ];
    return days[day];
}

function displayforecast(response){
    let forcast= response.data.daily;
    let forecastElement= document.querySelector("#weather-temperature-prediction");

    let forecastHTML= `<div class="row">`;
    forcast.forEach (function(forcastDay, index){
        if (index < 6) {
    forecastHTML=
            forecastHTML +
                `
               <div class="col-2">
                <div class="card" style="width: 5rem;">
                    <div class="card-body" id="weather-prediction-day">
                        ${formatDay(forcastDay.dt)}
                    </div>
                    <img src="http://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" class="card-img-top" id="icon-prediction" alt="..."/>
                    <div class="weather-temperature">
                    <spn class="weather-temperature-prediction-max">
                    ${Math.round(forcastDay.temp.max)}°   </spn>
                     <span class="weather-temperature-prediction-min">
                    ${Math.round(forcastDay.temp.min)}°
                     </span>
                    </div>
                    </div>
            </div> `
            ;
            }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML =forecastHTML;
}


search("Tehran");
