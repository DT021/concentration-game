import React from 'react'

import Timer from '../Timer/Timer'
import styles from './Game.scss'

Game.propTypes = {
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }

  render() {
    return (
      <div>
        <h1 className={styles.header}>NYT Games Code Test</h1>
        <Timer/>
        <div className={styles.placeholder}>Let the games begin (here).</div>
      </div>
    );
  }
}

export default Game;
