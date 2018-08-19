const initialState = {
  levels: [
    {
      "cards": ["✈", "♘", "✈", "♫", "♫", "☆", "♘", "☆"],
      "difficulty": "easy"
    },
    {
      "cards": ["❄", "⍨", "♘", "✈", "☯", "♠", "☆", "❄", "♫", "♫", "☯", "☆", "✈", "⍨", "♠", "♘"],
      "difficulty": "hard"
    },
    {
      "cards": ["⍨", "✈", "☆", "♘", "⍨", "♫", "♠", "✈", "❄", "✈", "♘", "☆", "❄", "☯", "☯", "♫", "♠", "⍨", "☯", "☆", "❄", "♘", "♫", "♠"],
      "difficulty": "triples"
    } // separate rest call
  ]
};

export default (state = initialState, action) => {
  return state;

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
