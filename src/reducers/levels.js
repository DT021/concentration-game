import axios from 'axios';

const URL_BASE = 'https://web-code-test-dot-nyt-games-prd.appspot.com/';
export const SET_LEVELS = 'SET_LEVELS';

function fetchLevelsAsync() {
  return Promise.all([
    axios.get(`${URL_BASE}cards.json`),
    axios.get(`${URL_BASE}triples.json`)
  ]).then(([cards, triples]) => [...cards.data.levels, triples.data]);
}

export const setLevels = (levels) => ({ type: SET_LEVELS, payload: levels });
export const fetchLevels = () => dispatch => fetchLevelsAsync().then(levels => dispatch(setLevels(levels)));

export default (state = [], action) => {
  switch (action.type) {
    case SET_LEVELS:
      return [...action.payload];
    default:
      return state;
  }
}

