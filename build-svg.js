const WEATHER_API_KEY = process.env.WEATHER_API_KEY

let fs = require('fs')
// let got = require('got')
let qty = require('js-quantities')   
let formatDistance = require('date-fns/formatDistance')

const emojis = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '🌩',
    '13d': '❄️',
    '50d': '🌫'
  }

// Cheap, janky way to have variable bubble width
dayBubbleWidths = {
  Monday: 235,
  Tuesday: 235,
  Wednesday: 260,
  Thursday: 245,
  Friday: 220,
  Saturday: 245,
  Sunday: 230,
}

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

let lat = '1.321'
let lon = '103.8198'
let lang = 'en';
let units = 'metric';
let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}&lang=${lang}`;

//fetch the weather
fetch(url)
.then((response) => {
    if (!response.ok) {
      throw new Error('Network response failed.');
    }
    return response.json();
  })
  .then((data) => {
    const degF = Math.round(data.list[0].main.temp)
    const degC = Math.round(qty(`${degF} tempF`).to('tempC').scalar)
    const icon = data.list[0].weather[0].icon

    fs.readFile('template.svg', 'utf-8', (error, data) => {
        if (error) {
        console.error(error)
        return
        }

        // const today = new Date()
        const today = convertTZ(new Date(), "Asia/Singapore");
        const todayDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);

        const psTime = formatDistance(new Date(2020, 12, 14), today, {
        addSuffix: false,
        })
    
        data = data.replace('{degF}', degF)
        data = data.replace('{degC}', degC)
        data = data.replace('{weatherEmoji}', emojis[icon])
        data = data.replace('{psTime}', psTime)
        data = data.replace('{todayDay}', todayDay)
    
        data = fs.writeFile('chat.svg', data, (err) => {
        if (err) {
        console.error(err)
        return
        }
        })
    })
  })
    .catch(console.err);



// weather.getWeatherOneCall(function (err, data) {
//     if (err) console.log(`err: ${err}`)
    
//     console.log("data: ", data)
//     const degF = Math.round(data.daily[0].temp.max)
//     const degC = Math.round(qty(`${degF} tempF`).to('tempC').scalar)
//     const icon = data.daily[0].weather[0].icon
  
//     fs.readFile('template.svg', 'utf-8', (error, data) => {
//       if (error) {
//         console.error(error)
//         return
//       }
  
//       data = data.replace('{degF}', degF)
//       data = data.replace('{degC}', degC)
//       data = data.replace('{weatherEmoji}', emojis[icon])
//       data = data.replace('{psTime}', psTime)
//       data = data.replace('{todayDay}', todayDay)
  
//       data = fs.writeFile('chat.svg', data, (err) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//       })
//     })
//   })

// const locationKey = '18363_PC'
// let url = `forecasts/v1/daily/1day/${locationKey}?apikey=${WEATHER_API_KEY}`

// got(url, { prefixUrl: WEATHER_DOMAIN })
//   .then((response) => {
//     console.log(response.body)
//     let json = JSON.parse(response.body)

//     const degF = Math.round(json.DailyForecasts[0].Temperature.Maximum.Value)
//     const degC = Math.round(qty(`${degF} tempF`).to('tempC').scalar)
//     const icon = json.DailyForecasts[0].Day.Icon

//     fs.readFile('template.svg', 'utf-8', (error, data) => {
//       if (error) {
//         return
//       }

//       data = data.replace('{degF}', degF)
//       data = data.replace('{degC}', degC)
//       data = data.replace('{weatherEmoji}', emojis[icon])
//       data = data.replace('{psTime}', psTime)
//       data = data.replace('{todayDay}', todayDay)
//       data = data.replace('{dayBubbleWidth}', dayBubbleWidths[todayDay])

//       data = fs.writeFile('chat.svg', data, (err) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//       })
//     })
//   })
//   .catch((err) => {
//     // TODO: something better
//     console.log(err)
//   })

