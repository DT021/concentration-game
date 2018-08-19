import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Timer from '../Timer/Timer';
import styles from './Game.scss';
import Card from '../Card/Card.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...props.game.cards],
      animationInProgress: false,
    };
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
      <div>
        <Link to="/">Options</Link>
        <h1 className={styles.header}>NYT Games Code Test</h1>
        <Timer/>
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

const mapStateToProps = (state) => state.game;
export default connect(mapStateToProps)(Game);
