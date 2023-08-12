
let day = document.querySelector('#day')
let date = document.querySelector('#date')
let city = document.querySelector('#city')
let BiggerTemp = document.querySelector('.BiggerTemp')
let searchInput = document.querySelector('#search')

// TODO weekDays
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

async function getWeather(city) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8b4bf8efde60491da4c210550231108&q=${city}&days=3`)
    var finalResult = await response.json()
    // console.log(finalResult);
    displayData(finalResult);
    futureDisplayData(finalResult);
}

searchInput.addEventListener('keyup', () => {
    getWeather(searchInput.value);
})

getWeather("Cairo");

function displayData(result) {
    let cartona = ``;
    // for (let i = 0; i < 1; i++) {
    const display = result.forecast.forecastday[0];
    const locationDis = result.location;
    const currentDis = result.current;
    const myDate = new Date(display.date);
    console.log(myDate);
    const monthIndex = myDate.getMonth();
    const day = myDate.getDate();
    //   TODO weekDays id=day
    cartona += `
        <div class="col-md-4 weatherInfo">
        <div class="d-flex justify-content-between align-items-between text-center day py-2">
            <span id="day">${weekDays[new Date(display.date).getDay()]}</span>  
            <span id="date">${months[monthIndex]} ${day}</span>
        </div>
        <hr>
        
        <div class="py-3 d-flex flex-column">
            <span id="city" class="display-6 city">${locationDis.region}</span>
            <div class="d-flex justify-content-between align-items-center">
                <div class="BiggerTemp">${currentDis.temp_c}<sup>o</sup>C</div>
                <img src="${currentDis.condition.icon}" alt="">
                
            </div>

            <span class="text-info">${currentDis.condition.text}</span>
            <div class="infoWeather my-3">
            <span class="mx-3"><img src="images/icon-umberella.png" alt="" class="mx-2">${display.day.daily_chance_of_rain}%</span>
            <span class="mx-3"><img src="images/icon-wind.png" alt="" class="mx-2">${currentDis.wind_kph}km/h</span>
            <span class="mx-3"><img src="images/icon-compass.png" alt="" class="mx-2">${currentDis.wind_dir}</span>
        </div>
        </div>
    </div>
      `;
    // }
    // console.log(cartona);
    document.querySelector('.myRow').innerHTML = cartona;
}


function futureDisplayData(result) {
    let cartonaa = ``;
    for (let i = 1; i < 3; i++) {
        const display = result.forecast.forecastday[i];
        const locationDis = result.location;
        const currentDis = result.current;
        const replacing = document.getElementById('replacing')
        //   TODO weekDays id=day
        if (i == 1) {
            cartonaa += `
            <div class="col-md-4 weatherInfoSec" id="replacing">
            <div class="text-center">
                <span id="day">${weekDays[new Date(display.date).getDay()]}</span>
    
            </div>
            <hr>
            <div class="py-3 d-flex flex-column justify-content-center">
                <div class="d-flex justify-content-center">
                <img src="${display.day.condition.icon}" alt="" class="img-fluid">
            </div>
                <div class="maxTemp text-center">${display.day.maxtemp_c}<sup>o</sup>C</div>
                <div class="minTemp text-center">${display.day.mintemp_c}<sup>o</sup>C</div>
                <span class="text-center my-3 text-info">${display.day.condition.text}</span>
            </div>
        </div>
          `;
        }

        else if (i == 2) {
            cartonaa += `
                <div class="col-md-4 weatherInfo" id="replacing">
                <div class="text-center">
                    <span id="day">${weekDays[new Date(display.date).getDay()]}</span>
        
                </div>
                <hr>
                <div class="py-3 d-flex flex-column justify-content-center">
                    <div class="d-flex justify-content-center">
                    <img src="${display.day.condition.icon}" alt="" class="img-fluid">
                </div>
                    <div class="maxTemp text-center">${display.day.maxtemp_c}<sup>o</sup>C</div>
                    <div class="minTemp text-center">${display.day.mintemp_c}<sup>o</sup>C</div>
                    <span class="text-center my-3 text-info">${display.day.condition.text}</span>
                </div>
            </div>
              `;


        }


    }
    // console.log(cartonaa);
    document.querySelector('.myRow').innerHTML += cartonaa;

}



