const apiKey = "667098e4c458c6b4b9e71fb0c6a355a9";
const apiUrl = "https://api.openweathermap.org/data/2.5/";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

async function fetchWeather(city) {
  try {
    const url = `${apiUrl}weather?units=metric&q=${city}&appid=${apiKey}&units=imperial`;
    const response = await fetch(url);
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";

    }

    const result = await response.json();

    document.querySelector(".city").innerHTML = result.name;
    document.querySelector(".temp").innerHTML =
      Math.round(result.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = result.main.humidity + " %";
    document.querySelector(".wind").innerHTML = result.wind.speed + " km/h";

    const weatherCondition = result.weather[0].main.toLowerCase();
    if (weatherCondition === "clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (weatherCondition === "rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (weatherCondition === "clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (weatherCondition === "snow") {
      weatherIcon.src = "./images/mist.png";
    } else {
      weatherIcon.src = "./images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
  } catch (error) {
    console.error("Error:", error);
  console.log("Failed to fetch weather data. Please try again later.");
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim().length <= 0) {
    alert("Please enter a city");
    return;
  }
  fetchWeather(searchBox.value.trim());
});
