import React from 'react'
import Game from '../Game/Game'

const App = (state) => (
  <div>
    <Game state={state}/>
    <Options state={state}/>
  </div>
);

export default App;
