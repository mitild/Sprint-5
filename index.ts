// Global Variables
const fetchBtn: HTMLElement | null = document.getElementById('fetch-btn');
const jokeWrapper: HTMLElement | null = document.getElementById('joke-wrapper');
const p = document.createElement('p');
const btnWrapper: HTMLElement | null = document.querySelector('.btn-wrapper');
// const scoreButtons = document.querySelectorAll('.score-btn');

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

// Fetch jokes from API
async function getJokes() {
  await fetch(API_URL, HEADER)
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
