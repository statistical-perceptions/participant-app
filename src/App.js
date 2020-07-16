import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import EnterID from "./components/EnterID";
import HomePage from "./components/HomePage";
import Experiment from "./components/Experiment";

function App() {
  return (
    <Provider store={store}>
      <HashRouter basename="/participant-app/">
        <div className="App">
          < Route exact path="/" component={HomePage} />
          < Route exact path="/:username/:expt" component={EnterID} />
          < Route exact path="/:username/:expt/experiment" component={Experiment}/>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
