const initialState = {
  game: {
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
  }
};

export default (state = initialState, action) => {
  return state;
}
