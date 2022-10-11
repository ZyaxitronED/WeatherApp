/*

let appId = '6d79b84d0841098ea6f44dad41f2f82f';
let units = 'metric';
let searchMethod = 'zip';

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    });
}

function init(resultFromServer) {
    console.log(resultFromServer);
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById(searchInput);
    if(searchTerm)
        searchWeather(searchTerm);
})

*/

let weather = {
    "apiKey": "6d79b84d0841098ea6f44dad41f2f82f",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name, visibility, timezone } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like, pressure } = data.main;
        const { speed, deg } = data.wind;
        const { all } = data.clouds;   
        const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000); 
        
        //console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".feelsLike").innerText = "Feels Like: " + feels_like + "°C";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa";
        document.querySelector(".visibility").innerText = "Visibility: " + visibility/1000 + "km";
        document.querySelector(".windDirection").innerText = "Wind Direction: " + deg + "°";
        document.querySelector(".cloudiness").innerText = "Cloudiness: " + all + "%";
        //document.querySelector(".time").innerText = "Timezone: " + sunrise;
        document.querySelector(".time").innerText = `Timezone: GMT ${data.timezone/3600}:00`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + description + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
/*
document.querySelector(".search").addEventListener("click", function() {
    weather.search();
});
*/
document.querySelector(".search").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("London");

/*document.getElementById("open").addEventListener("click", function() {
    this.classList.toggle("is-active");
})*/

var coll = document.getElementsByClassName("collapsible");
var i;
const infoBtn = document.getElementById('infoBtn');
const moreInfoTransition = document.getElementById('moreInfo');

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {            
      infoBtn.textContent = "More Information";
      moreInfoTransition.classList.toggle("active");
      moreInfoTransition.classList.toggle("closed");
        window.setTimeout(function() { content.style.display = "none"; }, 1490);
    } else {
      content.style.display = "block";
      infoBtn.textContent = "Less Information";
      moreInfoTransition.classList.toggle("active");
      moreInfoTransition.classList.toggle("closed");
    }
  });
}

/*
const dateBuilder = (timezone) => {

    const nowInLocalTime = Date.now() + 1000 * (timezone/3600);
    const millitime = new Date(nowInLocalTime);
    const dateFormat = millitime.toLocaleString();

    let day = millitime.toLocaleString("en-US", {weekday: "long"});
    let month = millitime.toLocaleString("en-US", {month: "long"});
    let date = millitime.toLocaleString("en-US", {day: "numeric"});
    let year = millitime.toLocaleString("en-US", {year: "numeric"});
    let hours = millitime.toLocaleString("en-US", {hour: "numeric"});
    let minutes = millitime.toLocaleString("en-US", {minute: "numeric"});

    return `{day} {date} {month} {year} {hours} {minutes}`;
}
*/

