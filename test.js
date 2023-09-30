
//use the values from latitude and longitude to fetch the weather
let lat = '1.321'
let lon = '103.8198'
let key = '333c47b37739c5e3a453a60590473cf0';
let lang = 'en';
let units = 'metric';
let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
let qty = require('js-quantities')   


//fetch the weather
fetch(url)
.then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    const degF = Math.round(data.list[0].main.temp)
    const degC = Math.round(qty(`${degF} tempF`).to('tempC').scalar)
    const icon = data.list[0].weather[0].icon
    console.log(degC, icon)
  })
    .catch(console.err);