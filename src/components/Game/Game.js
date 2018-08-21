import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash.get';

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
  }

  initGame() {
    const state = get(this.props, 'location.state');
    if (state.previous && this.props.options.clock) {
      return this.props.options;
    }
    const level = this.props.levels.find(({ difficulty }) => difficulty === state.difficulty);
    const cards = level.cards.map(symbol => ({ symbol, discovered: false, selected: false }));
    return { level, cards, clock: 0, failedAttempts: 0 };
  }

  handleCardClick(index) {
    const cards = [...this.state.cards];
    const card = cards[index];

    // Animation in progress ot card already discovered, do nothing
    if (this.state.animationInProgress || card.discovered) {
      return;
    }

    const selectedCardIndex = cards.findIndex(card => card.selected);

    // No selected cards, select current
    if (selectedCardIndex === -1) {
      cards[index].selected = true;
    }
    // Current symbol matched with selected card's symbol, discover both
    else if (card.symbol === cards[selectedCardIndex].symbol) {
      cards[selectedCardIndex].selected = false;
      cards[selectedCardIndex].discovered = true;
      cards[index].discovered = true;
    }
    // No matches, un-discover all after selecting current
    else {
      cards[index].selected = true;
      return this.setState({ cards, animationInProgress: true }, () => {
        // Sett a small time out to allow for animation
        setTimeout(() => {
          cards[index].selected = false;
          cards[selectedCardIndex].selected = false;
          this.setState({ cards, animationInProgress: false });
        }, 600);
      });
    }

    this.setState({ cards });
  }

  render() {
    const { cards } = this.state;
    return (
      <div className={styles.game}>
        <div className={styles.toolbar}>
          <Link to="/">← Options</Link>
          <div className={styles.message}>Your game will be saved</div>
          <Timer/>
        </div>
        <div className={styles.placeholder}>
          {cards.map((card, i) => (
            <Card
              card={card}
              onClick={this.handleCardClick.bind(this, i)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ levels, options }) => ({ levels, options });
const mapDispatchToProps = { setOptions };
const ConnectedGame = withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
export default ConnectedGame;
