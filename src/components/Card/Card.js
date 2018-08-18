import React from 'react';
import get from 'lodash.get';
import classnames from 'classnames';

import styles from './Card.scss';

export default function Card(props) {
  const className = classnames(styles.card, {
    [styles.facedown]: !props.discovered
  });

  return (
    <div className={className} onClick={props.onClick}>
      {props.discovered && get(props, 'symbol', '').toString()}
    </div>
  );
}
