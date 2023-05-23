//I opted to create a new file in order to store my API key off public. 
import API_KEY from './config';

// Alternatively create a const to represent your API key in order for your code to work locally. 

// const myApiKey = "INSERT YOUR API KEY HERE" 

const searchButton = document.querySelector('button');
const locationInput = document.querySelector('.searchBar');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const windspeed = document.querySelector('.windspeed');
const description = document.querySelector('.description');
const sentence = document.querySelector('.sentenceContainer');
const weatherImages = document.getElementById('weatherImages');



/*
Switch function has to use true as the expression; this is because the case is being evaluated.  
*/

function weatherForecast(temperatureOutside) {
  switch (true) {
    case temperatureOutside >= 25:
      weatherImages.src = 'images/sun-48.png';
      return 'It\'s hot outside! Wear sunscreen, and stay hydrated.';
      break;
    case temperatureOutside >= 15:
      weatherImages.src = 'images/sun-behind-small-cloud-48.png';
      return 'It\'s mild day today.';
      break;
    case temperatureOutside >= 10:
      weatherImages.src = 'images/cloud-50.png';
      return 'You might want a light jacket.';
      break;
    case temperatureOutside >= 5:
      weatherImages.src = 'images/cold-48.png';
      return 'It\s cold day.';
      break;
    case temperatureOutside >= -20:
      weatherImages.src = 'images/snowflake-48.png';
      return 'It\'s freezing outside! Brr!';
      break;
    default:
      weatherImages.src = 'images/calendar-64.png'
      return 'Dress accordingly.';
      break;
  }
}


// String interpolation
function getWeatherInfo() {
  const location = locationInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  //Make sure when you are using your own personal ApiKey, its correctly referenced within the URL:
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myApiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      city.innerHTML = data.name + ', ' + data.sys.country;
      temp.innerHTML = 'Temperature: ' + data.main.temp + '°C';
      humidity.innerHTML = 'Humidity: ' + data.main.humidity + '%';
      windspeed.innerHTML = 'Wind Speed: ' + data.wind.speed + 'm/s';
      description.innerHTML = 'Weather Conditions: ' + data.weather[0].description;
      sentence.innerHTML = weatherForecast(data.main.temp);
    })
    .catch(error => {
      alert('Invalid Input');
    });
}

searchButton.addEventListener('click', getWeatherInfo);


