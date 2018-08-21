import axios from 'axios';

const URL_BASE = 'https://web-code-test-dot-nyt-games-prd.appspot.com/';
export const FETCH_LEVELS = 'FETCH_LEVELS';
export const SET_LEVELS = 'SET_LEVELS';

export const setLevels = (levels) => ({ type: SET_LEVELS, payload: levels });
export const fetchLevels = () => {
  return () => {
    fetchLevelsAsync()
      .then(levels => setLevels(levels))
  };
};

const fetchLevelsAsync = () => {
  return Promise.all([
    axios.get(`${URL_BASE}cards.json`),
    axios.get(`${URL_BASE}triples.json`)
  ]).then(([cards, triples]) => [...cards.data.levels, triples.data]);
};

export default (state = { levels: [] }, action) => {
  switch (action.type) {
    case SET_LEVELS:
      return Object.assign({}, state, { levels: action.payload });
    default:
      return state;
  }
}

