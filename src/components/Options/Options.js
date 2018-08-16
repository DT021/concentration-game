import React from 'react';

import styles from './Options.scss';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: {}
    };
  }

  render() {
    return (
      <div className={styles.options}>
       <button>Play</button>
      </div>
    );
  }
}

Options.propTypes = {};

export default Options;
