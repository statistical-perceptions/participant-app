import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import EnterID from "./components/EnterID";
import HomePage from "./components/HomePage";
import Experiment from "./components/Experiment";
import Success from "./components/Success";

import PreviewEnterID from "./components/PreviewEnterID";
import PreviewExpt from "./components/PreviewExpt";
import PreviewSuccess from "./components/PreviewSuccess"
import NormalCurveSurvey from "./items/NormalCurveSurvey";

var data = require("./inputDataPy2.json");

function App() {
  return (
    <Provider store={store}>
      <HashRouter basename="/participant-app/">
        <div className="App">
          {/* <Route exact path="/" component={HomePage}/> */}
          <Route exact path="/" 
          render={(props) => (<NormalCurveSurvey data={data} />)}/>

          <Route exact path="/success" component={Success}/>
          <Route exact path="/expt/:username/:expt" component={EnterID}/>
          <Route exact path="/expt/:username/:expt/:qKey" component={Experiment}/>

          <Route exact path="/previewSuccess" component={PreviewSuccess}/>
          <Route exact path="/preview/:username/:expt" component={PreviewEnterID}/>
          <Route exact path="/preview/:username/:expt/:qKey" component={PreviewExpt}/>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
