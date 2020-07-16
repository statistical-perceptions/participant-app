import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Experiment from "./components/Experiment";
import HomePage from "./components/HomePage";

function App() {
  return (
    <HashRouter basename="/participant-app/">
      <div className="App">
        < Route exact path="/" component={HomePage} />
        < Route exact path="/:username/:expt" component={Experiment} />
      </div>
    </HashRouter>
  );
}

export default App;
