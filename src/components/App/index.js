import React from 'react';
import Game from '../Game/Game';
import Options from '../Options/Options';

const state = {
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
  ], // to be populated via rest calls
  game: {
    level: {
      "cards": ["✈", "♘", "✈", "♫", "♫", "☆", "♘", "☆"],
      "difficulty": "easy"
    }, // collected from above upon selection,
    clock: 0,  // last recorded time in milliseconds
    failedAttempts: 0, // how many times the user failed trying to match cards
    cardPositions: [false, false, true, false, true, false, false, false], // boolean array where true means card for that index is up
  },
  options: {
    difficulty: 'easy',
    // ... other stuff
  }
};

const App = (props) => {
  return (
    <div>
      <Game data={state}/>
      <Options data={state}/>
    </div>
  );
};

export default App;
