// Global Variables
const fetchBtn: HTMLElement | null = document.getElementById('fetch-btn');
const jokeWrapper: HTMLElement | null = document.getElementById('joke-wrapper');
const p = document.createElement('p');

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

async function getJokes() {
  await fetch(API_URL, HEADER)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      p.textContent = `${data.joke}`;
      jokeWrapper?.appendChild(p);
    })
    .catch(() => alert(ERROR));
}

fetchBtn?.addEventListener('click', getJokes);
