import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Card.scss';

export default function Card(props) {
  const { symbol, discovered, selected } = props.card;
  const faceUp = (discovered || selected);
  const className = classnames(styles.card, styles[props.difficulty], {
    [styles.facedown]: !faceUp,
  });

  return (
    <div className={className} onClick={props.onClick} role="presentation">
      {faceUp && symbol.toString()}
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  difficulty: PropTypes.string,
  onClick: PropTypes.func,
};
