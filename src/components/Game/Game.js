import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash.get';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

import Timer from '../Timer/Timer';
import styles from './Game.scss';
import Card from '../Card/Card';
import { setOptions } from '../../reducers/options';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.initGame(),
      animationInProgress: false,
    };

    this.handleTick = this.handleTick.bind(this);
  }

  componentWillUnmount() {
    // Save state
    this.props.setOptions({ ...this.state });
  }

  initGame() {
    const state = get(this.props, 'location.state');
    if (state.previous && this.props.options.currentGame) {
      return this.props.options.currentGame;
    }
    const id = uuid();
    const level = this.props.levels.find(({ difficulty }) => difficulty === state.difficulty);
    const cards = level.cards.map(symbol => ({ symbol, discovered: false, selected: false }));
    return { id, level, cards, clock: 0, failedAttempts: 0 };
  }

  handleTick() {
    this.setState({ clock: this.state.clock + 1 });
  }

  handleCardClick(index) {
    const { cards, level: { difficulty }, failedAttempts } = this.state;
    const card = cards[index];

    // Animation in progress or card already discovered, do nothing
    if (this.state.animationInProgress || card.discovered) {
      return;
    }
    // Fetch selected cards
    const selectedCards = cards.filter(c => c.selected);
    // No selected cards, select current
    if (!selectedCards.length) {
      cards[index].selected = true;
    }
    // Matching pairs logic
    else if (difficulty !== 'triples') {
      const selectedCardIndex = cards.findIndex(c => c.selected);
      // Current symbol matched with selected card's symbol, discover both
      if (card.symbol === cards[selectedCardIndex].symbol) {
        cards[selectedCardIndex].selected = false;
        cards[selectedCardIndex].discovered = true;
        cards[index].discovered = true;
      }
      // No matches, un-discover all after selecting current
      else {
        cards[index].selected = true;
        return this.setState({ cards, animationInProgress: true, failedAttempts: failedAttempts + 1 }, () => {
          // Sett a small time out to allow for animation
          setTimeout(() => {
            cards[index].selected = false;
            cards[selectedCardIndex].selected = false;
            this.setState({ cards, animationInProgress: false });
          }, 600);
        });
      }
    }
    // Matching triples logic
    else if (difficulty === 'triples') {
      // Only one card selected, select current one
      if (selectedCards.length === 1) {
        const firstIndex = cards.indexOf(selectedCards[0]);
        if (card.symbol === cards[firstIndex].symbol) {
          cards[index].selected = true;
        } else {
          cards[index].selected = true;
          return this.setState({ cards, animationInProgress: true }, () => {
            // Sett a small time out to allow for animation
            setTimeout(() => {
              cards[index].selected = false;
              cards[firstIndex].selected = false;
              this.setState({ cards, animationInProgress: false });
            }, 600);
          });
        }
      }
      // Two cards selected...
      else if (selectedCards.length === 2) {
        const firstIndex = cards.indexOf(selectedCards[0]);
        const secondIndex = cards.indexOf(selectedCards[1]);
        // Matching symbols, discover all three
        if (card.symbol === cards[firstIndex].symbol && card.symbol === cards[secondIndex].symbol) {
          cards[firstIndex].selected = false;
          cards[secondIndex].selected = false;
          cards[firstIndex].discovered = true;
          cards[secondIndex].discovered = true;
          cards[index].discovered = true;
        }
        // No matches, un-discover all after selecting current
        else {
          cards[index].selected = true;
          return this.setState({ cards, animationInProgress: true, failedAttempts: failedAttempts + 1 }, () => {
            // Sett a small time out to allow for animation
            setTimeout(() => {
              cards[index].selected = false;
              cards[firstIndex].selected = false;
              cards[secondIndex].selected = false;
              this.setState({ cards, animationInProgress: false });
            }, 600);
          });
        }
      }
    }

    this.setState({ cards });
  }

  render() {
    const { cards, level: { difficulty }, failedAttempts, clock } = this.state;
    const containerStyle = classnames(styles.container, styles[difficulty]);
    const gameWon = cards.every(card => card.discovered);

    return (
      <div className={styles.game}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarItem}>
            <Link to="/">← Options</Link>
            <div className={styles.message}>Your game will be saved</div>
          </div>
          <div className={styles.toolbarItem} style={{ visibility: gameWon ? 'inherit' : 'hidden' }}>
            <div className={styles.toolbarItemValue}>You Are a Winner!</div>
            <div className={styles.toolbarItemLabel}>Please go back to options to start a new game</div>
          </div>
          <div className={styles.toolbarItem}>
            <div className={styles.toolbarItemValue}>{failedAttempts}</div>
            <div className={styles.toolbarItemLabel}>Failed attempts</div>
          </div>
          <div className={styles.toolbarItem}>
            <Timer onTick={this.handleTick} stop={gameWon} time={clock}/>
            <div className={styles.toolbarItemLabel}>Time spent</div>
          </div>
        </div>
        <div className={styles.placeholder}>
          <div className={containerStyle}>
            {cards.map((card, i) => (
              <Card
                key={card.symbol + i}
                card={card}
                difficulty={difficulty}
                onClick={() => this.handleCardClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  levels: PropTypes.array,
  options: PropTypes.object,
  setOptions: PropTypes.func,
};

const mapStateToProps = ({ levels, options }) => ({ levels, options });
const mapDispatchToProps = { setOptions };
const ConnectedGame = withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
export default ConnectedGame;
