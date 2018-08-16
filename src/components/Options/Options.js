import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Options.scss';


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


class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: {}
    };
  }

  render() {
    return (
      <div className={styles.options}>
       <Link to="/game">Play</Link>
      </div>
    );
  }
}

Options.propTypes = {};

export default Options;
