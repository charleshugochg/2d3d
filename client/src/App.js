import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import home from './pages/home'
import add from './pages/add'

axios.defaults.baseURL = 'https://asia-east2-d3d-66582.cloudfunctions.net/api'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/add" component={add}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
