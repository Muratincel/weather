const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
const row = document.querySelector(".row");
const apiKey = "dce06ae92cad929b4d4e8de18d6be3e7"

// ! background colors for weather;
const weatherColors = {
    Clear: "#f1c40f",
    Clouds: "#3498db",
    Rain: "#2ecc71",
    Snow: "#ecf0f1",
    Mist: "#95a5a6",
    Thunderstorm: "#8e44ad",
    Drizzle: "#d35400",
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let city = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            cityName = data.name;
            countryName = data.sys.country;
            // console.log(countryName);


            // !icons
            const iconCode = data.weather[0].icon
            const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

            // !description
            const weatherDescription = (data.weather[0].description)[0].toUpperCase() + (data.weather[0].description).slice(1)
            // console.log(weatherDescription);

            // !temperature
            const weatherTemperature = Math.round(data.main.temp);
            // console.log(weatherTemperature);

            // !bcg color
            const weatherBackgroundColor = weatherColors[data.weather[0].main]

            // !add the hour 
            // NEXT PROJECT

            row.innerHTML = `<div class="col-4 text-center fw-bold fs-3 rounded-5 d-flex justify-content-center">
                <div class="card" style="background-color:${weatherBackgroundColor}; width:60%;">
                    <img src="${weatherIconUrl}" class="card-img-top weather-icon" alt="...">
                    <ul class=""; style="height:18rem">
                      <li class="list-group-item ">${cityName}, ${countryName}</li>
                      <li class="list-group-item fs-1 ">${weatherTemperature}°</li>
                      <li class="list-group-item">${weatherDescription}</li>
                      <li class="list-group-item"></li>
                    </ul>
                  </div>
            </div>`

            searchInput.value = ""
        })
})