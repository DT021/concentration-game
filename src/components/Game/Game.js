import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash.get';
import classnames from 'classnames';

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

  componentWillUnmount() {
    const { animationInProgress, ...options } = this.state;
    this.props.setOptions(options);
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
    const { cards, level: { difficulty } } = this.state;
    const card = cards[index];

    // Animation in progress or card already discovered, do nothing
    if (this.state.animationInProgress || card.discovered) {
      return;
    }
    // Fetch selected cards
    const selectedCards = cards.filter(card => card.selected);
    // No selected cards, select current
    if (!selectedCards.length) {
      cards[index].selected = true;
    }
    // Matching pairs logic
    else if (difficulty !== 'triples') {
      const selectedCardIndex = cards.findIndex(card => card.selected);
      // Current symbol matched with selected card's symbol, discover both
      if (card.symbol === cards[selectedCardIndex].symbol) {
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
    }
    // Matching triples logic
    else if (difficulty === 'triples') {
      // Only one card selected, select current one
      if (selectedCards.length === 1) {
        const firstIndex = cards.indexOf(selectedCards[0]);
        if(card.symbol === cards[firstIndex].symbol) {
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
          return this.setState({ cards, animationInProgress: true }, () => {
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
    const { cards, level: { difficulty } } = this.state;
    const containerStyle = classnames(styles.container, styles[difficulty]);

    return (
      <div className={styles.game}>
        <div className={styles.toolbar}>
          <Link to="/">← Options</Link>
          <div className={styles.message}>Your game will be saved</div>
          <Timer/>
        </div>
        <div className={styles.placeholder}>
          <div className={containerStyle}>
            {cards.map((card, i) => (
              <Card
                card={card}
                difficulty={difficulty}
                onClick={this.handleCardClick.bind(this, i)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ levels, options }) => ({ levels, options });
const mapDispatchToProps = { setOptions };
const ConnectedGame = withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
export default ConnectedGame;
