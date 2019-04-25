import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Swagger from './components/Swagger';
import TestComponent from './components/TestComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/swagger" component={Swagger} />
          <Route path="/" component={TestComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
