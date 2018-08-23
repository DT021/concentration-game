import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash.get';

import styles from './Options.scss';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 'easy'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getDescription(type) {
    switch (type) {
      case 'easy':
        return '8 cards, match couples';
      case 'hard':
        return '16 cards, match couples';
      case 'triples':
        return 'match up triples!';
    }
  }

  handleInputChange(difficulty) {
    this.setState({ difficulty });
  }

  render() {
    const showResume = !get(this.props, 'options.currentGame.gameWon', true);
    const previousGames = Object.values(get(this.props, 'options.previousGames', {}));
    return (
      <div className={styles.options}>
        <div className={styles.choices}>
          {this.props.levels.map(({ difficulty }) => (
            <div className={styles.choice} key={difficulty} onClick={this.handleInputChange.bind(null, difficulty)}>
              <div className={styles.radio}>
                <input
                  type="radio"
                  value={difficulty}
                  checked={this.state.difficulty === difficulty}
                  onChange={() => {
                  }}
                />
                <span>{difficulty.toUpperCase()}</span>
              </div>
              <div className={styles.description}>{this.getDescription(difficulty)}</div>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <Link to={{ pathname: '/game', state: { difficulty: this.state.difficulty } }}>Play</Link>
          {showResume && <Link to={{ pathname: '/game', state: { previous: true } }}>Resume</Link>}
        </div>
        {previousGames.length && <div className={styles.previousGames}>
          <table>
            <thead>
            <tr>
              <th>When</th>
              <th>Difficulty</th>
              <th>Time Spent</th>
              <th>Failed Attempts</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(this.props.options.previousGames).map(({ level, clock, failedAttempts, gameWon, when }, i) => (
              <tr key={i}>
                <td>{when}</td>
                <td>{level.difficulty}</td>
                <td>{clock}</td>
                <td>{failedAttempts}</td>
                <td>{gameWon ? 'Finished' : 'In Progress'}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>}
      </div>
    );
  }
}


const mapStateToProps = ({ options, levels }) => ({ options, levels });
const ConnectedOptions = withRouter(connect(mapStateToProps)(Options));
export default ConnectedOptions;
