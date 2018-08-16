import React from 'react';

import styles from './Card.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      up: props.up
    };
  }

  render() {
    const { card } = this.props;
    return (
      <div className={styles.card}>
        {card}
      </div>
    );
  }
}

Card.propTypes = {};

export default Card;
