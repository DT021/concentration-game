import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
          {this.props.options.clock && <Link to={{ pathname: '/game', state: { previous: true } }}>Resume Last Game</Link>}
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ options, levels }) => ({ options, levels });
const ConnectedOptions = withRouter(connect(mapStateToProps)(Options));
export default ConnectedOptions;
