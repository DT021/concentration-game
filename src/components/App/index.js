import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchLevels } from '../../reducers/levels';
import Game from '../Game/Game';
import Options from '../Options/Options';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchLevels &&  this.props.fetchLevels();
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

const mapStateToProps = (state) => state;
const mapDispatchToProps = { fetchLevels };
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

