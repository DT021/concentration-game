import React from 'react';
import get from 'lodash.get';
import classnames from 'classnames';

import styles from './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      up: get(props, 'initialPosition', false)
    };

    this.handleClick = this.handleClick.bind(this);
  }

  toggleCard() {
    this.setState({up: !this.state.up});
  }

  handleClick() {
    this.toggleCard();
  }

  render() {
    const className = classnames(styles.card, {
      [styles.facedown]: !this.state.up
    });

    return (
      <div className={className} onClick={this.handleClick}>
        {get(this.props, 'symbol', '').toString()}
      </div>
    );
  }
}

Card.propTypes = {};

export default Card;
