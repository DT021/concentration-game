import request from 'request-promise-native';

const URL_BASE = 'https://web-code-test-dot-nyt-games-prd.appspot.com/';

export async function fetchCardLevels() {
  return Promise.all([
    request(`${URL_BASE}cards.json`),
    request(`${URL_BASE}triples.json`),
  ]).then(([cards, triples]) => [...cards.levels, triples]);
}
