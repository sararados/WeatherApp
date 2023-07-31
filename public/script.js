const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Fetch the API key from the server before making weather requests
async function fetchApiKey() {
  try {
    const response = await fetch('/api-key');
    const apiKey = await response.text();

    // Now you have the API key, use it in your fetch requests
    searchBtn.addEventListener("click", () => {
      const city = searchBox.value;
      fetch(`/weather?city=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          // Handle weather data as before
          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#176;c";
          document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; 

          if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
          } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
          } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
          } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
          }

          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
        })
        .catch(error => {
          console.error("Error fetching weather data from the server:", error);
          // Handle error
        });
    });
  } catch (error) {
    console.error("Error fetching API key from the server:", error);
    // Handle error
  }
}

// Fetch the API key when the page loads
fetchApiKey();
