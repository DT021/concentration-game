import React from 'react';
import { connect } from 'react-redux';
import { MemoryRouter as Router, Route } from 'react-router-dom';

import Game from '../Game/Game';
import Options from '../Options/Options';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Options}/>
      <Route path="/game" component={Game}/>
    </div>
  </Router>
);

export default App;
