let now = new Date();
let date = now.getDate();
let time = now.getHours();
let mins = now.getMinutes();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let cur = document.querySelector(".cur_date");
if (mins < 10) {
  cur.innerHTML = days[day] + " " + time + ":0" + mins;
} else {
  cur.innerHTML = days[day] + " " + time + ":" + mins;
}

search("New York");

let form_nm = document.querySelector("form");
form_nm.addEventListener("submit", submit_form);

function submit_form(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let city_val = city.value;
  search(city_val);
}
function search(city_param) {
  console.log(city_param);
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let unit = "metric";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city_param}&appid=${apiKey}&units=${unit}`;
  axios.get(apiurl).then(show_temperature);
}

function show_temperature(response) {
  let temp = Math.round(response.data.main.temp);
  let city_val = response.data.name;
  let humidity_val = response.data.main.humidity;
  let wind_val = Math.round(response.data.wind.speed);
  let description_val = response.data.weather[0].description;
  let display_pic_val = response.data.weather[0].icon;
  let degree = document.querySelector(".degree");
  let degree_hid = document.querySelector(".degree_hid");
  let city_name = document.querySelector("h3");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let description = document.querySelector(".description");
  let display_pic = document.querySelector(".display_pic");
  city_name.innerHTML = city_val;
  degree.innerHTML = temp;
  humidity.innerHTML = humidity_val + "%";
  wind.innerHTML = wind_val + "mph";
  description.innerHTML = description_val;
  degree_hid.value = temp;
  display_pic.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${display_pic_val}@2x.png`
  );
  daily_temp(response);
}

function daily_temp(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let exclude = "daily";
  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let unit = "metric";
  let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiurl).then(show_daily_temperature);
}
function show_daily_temperature(response) {
  let forecast = response.data.daily;
  let inner_forecast = document.querySelector(".forecast_html");
  let forecast_html = "<div class='row'>";
  console.log(forecast);
  forecast.forEach(function (forecast_day, index) {
    if (index < 6) {
      forecast_html =
        forecast_html +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecast_day.dt)}</div>
          <img src="https://openweathermap.org/img/wn/${
            forecast_day.weather[0].icon
          }@2x.png" width=42>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecast_day.temp.max
            )}&#176;</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecast_day.temp.min
            )}&#176;</span>
          </div>
        </div>`;
    }
  });
  inner_forecast.innerHTML = forecast_html;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
