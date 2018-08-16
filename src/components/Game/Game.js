import React from 'react';

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

  render() {
    console.log(this.props)
    const { game } = this.props.data;
    console.log(this.props)
    return (
      <div>
        <h1 className={styles.header}>NYT Games Code Test</h1>
        <Timer/>
        <div className={styles.placeholder}>
          {game.level.cards.map(card => <Card>{card}</Card>)}
        </div>
      </div>
    );
  }
}

Game.propTypes = {};

export default Game;
