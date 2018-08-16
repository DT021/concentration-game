import React from 'react';
import get from 'lodash.get';

import Timer from '../Timer/Timer';
import styles from './Game.scss';
import Card from '../Card/Card.js';

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
    const cards = get(this.props, 'data.game.level.cards', []);
    const cardPositions = get(this.props, 'data.game.cardPositions', []);
    return (
      <div>
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
