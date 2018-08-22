import React from 'react';
import classnames from 'classnames';

import styles from './Card.scss';

export default function Card(props) {
  const { symbol, discovered, selected } = props.card;
  const faceUp = (discovered || selected);
  const className = classnames(styles.card, styles[props.difficulty], {
    [styles.facedown]: !faceUp,
  });

  return (
    <div className={className} onClick={props.onClick}>
      {faceUp && symbol.toString()}
    </div>
  );
}
