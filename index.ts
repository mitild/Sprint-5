// Global Variables
const fetchBtn: HTMLElement | null = document.getElementById('fetch-btn');
const jokeWrapper: HTMLElement | null = document.getElementById('joke-wrapper');
const p = document.createElement('p');
const btnWrapper: HTMLElement | null = document.querySelector('.btn-wrapper');

//======== JOKES HANDLING ========//

let joke = '';

// Reports Object Interface
interface reportsObject {
  joke: string;
  score: number | null;
  date: string;
}

// Array of Reports
const d = new Date().toISOString();
const reportJokes: reportsObject[] = [
  {
    joke: '',
    score: null,
    date: '',
  },
];

// API's Variables
const API_URL = 'https://icanhazdadjoke.com/';
const HEADER: {
  method: string;
  headers: {
    Accept: string;
  };
} = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
};
const ERROR =
  'Sorry, we were not able to resolve your request. Please, check for any typos and try again';
const API_URL2 = 'https://v2.jokeapi.dev/joke/Programming?type=single';

// Fetch jokes from API
async function getJokes() {
  // Randomize the API to fetch data from
  const randomNumber: number = Math.floor(Math.random() * 10 + 1);
  const randomApi: string = randomNumber % 2 ? API_URL : API_URL2;
  // Fetch
  await fetch(randomApi, HEADER)
    .then(res => res.json())
    .then(data => {
      // console.log(data);

      // Print jokes
      p.textContent = `${data.joke}`;

      // Print Buttons
      jokeWrapper.appendChild(p);

      // Get access to the joke from outside the fetch
      joke = data.joke;
      return joke;
    })
    .catch(() => alert(ERROR));

  btnWrapper.classList.remove('hidden');
  //
  const newJoke: reportsObject = {
    joke: joke,
    score: null,
    date: d,
  };

  reportJokes.push(newJoke);
  console.log(reportJokes);
}

function getScore(id: number): any {
  const jokeIndex = reportJokes.length - 1;
  reportJokes[jokeIndex].score = id;
  console.log(reportJokes);
}

fetchBtn?.addEventListener('click', getJokes);

//======== WEATHER API ========//

navigator.geolocation.getCurrentPosition(position => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then(res => {
      if (!res.ok) {
        throw Error('Weather data not available');
      }
      return res.json();
    })
    .then(data => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById('weather-wrapper').innerHTML = `
          <div class="flex-container">
            <img src=${iconUrl} />
            <p class="weather-temp">| ${Math.round(data.main.temp)}ºC</p>
          </div>
      `;
    })
    .catch(err => console.error(err));
});
