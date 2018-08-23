import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchLevels } from '../../reducers/levels';
import { initOptions } from '../../reducers/options';
import Game from '../Game/Game';
import Options from '../Options/Options';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchLevels();
  }

  componentDidMount() {
    this.props.initOptions();
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Options}/>
          <Route path="/game" component={Game}/>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  fetchLevels: PropTypes.func,
  initOptions: PropTypes.func
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = { fetchLevels, initOptions };
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

