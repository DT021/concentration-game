import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';

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
      default:
        return '';
    }
  }

  handleInputChange(difficulty) {
    this.setState({ difficulty });
  }

  render() {
    const showResume = !get(this.props, 'options.currentGame.gameWon', true);
    const previousGames = Object.values(get(this.props, 'options.previousGames', {}));
    const last10 = previousGames.slice(Math.max(previousGames.length - 10, 0));
    return (
      <div className={styles.options}>
        <div className={styles.choices}>
          {this.props.levels.map(({ difficulty }) => (
            <div
              role="presentation"
              className={styles.choice}
              key={difficulty}
              onClick={() => this.handleInputChange(difficulty)}>
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
        {previousGames.length > 0 && <div className={styles.previousGames}>
          <table>
            <thead>
            <tr>
              <th>When (LAST 10 GAMES)</th>
              <th>Difficulty</th>
              <th>Time Spent</th>
              <th>Failed Attempts</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {last10.map(({ level, clock, failedAttempts, gameWon, when }, i) => (
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

Options.propTypes = {
  options: PropTypes.object,
  levels: PropTypes.array
};

const mapStateToProps = ({ options, levels }) => ({ options, levels });
const ConnectedOptions = withRouter(connect(mapStateToProps)(Options));
export default ConnectedOptions;
