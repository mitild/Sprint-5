"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global Variables
const fetchBtn = document.getElementById('fetch-btn');
const jokeWrapper = document.getElementById('joke-wrapper');
const p = document.createElement('p');
const API_URL = 'https://icanhazdadjoke.com/';
const HEADER = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
    },
};
const ERROR = 'Sorry, we were not able to resolve your request. Please, check for any typos and try again';
function getJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(API_URL, HEADER)
            .then(res => res.json())
            .then(data => {
            console.log(data);
            p.textContent = `${data.joke}`;
            jokeWrapper === null || jokeWrapper === void 0 ? void 0 : jokeWrapper.appendChild(p);
        })
            .catch(() => alert(ERROR));
    });
}
fetchBtn === null || fetchBtn === void 0 ? void 0 : fetchBtn.addEventListener('click', getJokes);
