import React from 'react';
import get from 'lodash.get';
import { Link } from 'react-router-dom';

import Timer from '../Timer/Timer';
import styles from './Game.scss';
import Card from '../Card/Card.js';


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

class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      //
    };
  }

  handleCardClick(index) {
    // todo integrate with store
    const cardPositions = get(this.props, 'data.game.cardPositions', []);
    cardPositions[index] = !!cardPositions[index];

  }

  render() {
    const cards = get(state, 'game.level.cards', []);
    const cardPositions = get(state, 'game.cardPositions', []);
    return (
      <div>
        <Link to="/">Options</Link>
        <h1 className={styles.header}>NYT Games Code Test</h1>
        <Timer/>
        <div className={styles.placeholder}>
          {cards.map((card, i) => (
            <Card
              initialPosition={cardPositions[i]}
              symbol={card}
              onCardClick={this.handleCardClick.bind(this, i)}
            />
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {};

export default Game;
