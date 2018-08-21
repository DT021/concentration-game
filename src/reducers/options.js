export const FETCH_LEVELS = 'FETCH_LEVELS';
export const SET_OPTIONS = 'SET_OPTIONS';

export const setOptions = (options) => ({ type: SET_OPTIONS, payload: levels });

const initialState = {
  level: {
    "cards": ["✈", "♘", "✈", "♫", "♫", "☆", "♘", "☆"],
    "difficulty": "easy"
  }, // collected from above upon selection,
  clock: 0,  // last recorded time in milliseconds
  failedAttempts: 0, // how many times the user failed trying to match cards
  cards: [
    { symbol: "✈", discovered: false, selected: false },
    { symbol: "♘", discovered: false, selected: false },
    { symbol: "✈", discovered: false, selected: false },
    { symbol: "♫", discovered: false, selected: false },
    { symbol: "♫", discovered: false, selected: false },
    { symbol: "☆", discovered: false, selected: false },
    { symbol: "♘", discovered: false, selected: false },
    { symbol: "☆", discovered: false, selected: false }
  ]
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_OPTIONS:
      localStorage.setItem(options, JSON.stringify(action.payload));
      return { ...action.payload };
    default:
      return state;
  }
}
