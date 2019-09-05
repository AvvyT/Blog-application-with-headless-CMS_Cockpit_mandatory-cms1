import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import Home from './components/Home';
import Article from './components/Article';
import Authors from './components/Authors';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App-header">
        <h1>BloggApp</h1>
        <Route path="/" exact render={() => <Redirect to="/page/" />} />
        <Route path="/page/:page" component={Home} />
        <Route path="/article/:id" component={Article} />
        <Route path="/authors" component={Authors} />

      </div>
    </Router>
  );
}

export default App;
