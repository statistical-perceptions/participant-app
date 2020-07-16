import React, { Component } from 'react';
import axios from "axios";

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ParticipantID: '',
      JSONtoManifest: {}
    }
    this.onChange = this.onChange.bind(this);
    this.getData = this.getData.bind(this);
    this.sendData = this.sendData.bind(this);
    this.showState = this.showState.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showState() {
    console.log(this.state.JSONtoManifest);
    console.log(this.state.ParticipantID);
  }

  getData() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.expt.split("-")[0];
    const exptName = this.props.match.params.expt.split("-")[1];
    const API_URL = 'https://test-api-615.herokuapp.com/api/feedback/' +
      username + '/info/' + 'studyName-' + studyName;
    axios
      .get(API_URL)
      .then(res => {
        const experiments = res.data.experiments;
        var thisExpt = {};
        experiments.forEach(element => {
          if (element.exptName == exptName) {
            thisExpt = element;
          }
        });
        this.setState({ JSONtoManifest: thisExpt });
        console.log("got data")
      })
  }

  sendData(finalData) {
    const username = this.props.match.params.username;
    const exptName = this.props.match.params.expt;
    const API_URL = 'https://test-api-615.herokuapp.com/api/feedback/' +
      username + '/' + exptName;
    axios
      .post(API_URL, finalData)
      .then(res => {
        console.log(res);
        alert("You have successfully submitted your response.");
      })
  }

  render() {
    const exptName = this.props.match.params.expt;
    return (
      <div className="container">
        Experiment name: <br/>
        <b>{exptName}</b>
        <br/>
        <form onSubmit={this.showState}>
          <input type="text" name="ParticipantID" 
            value={this.state.ParticipantID} onChange={this.onChange}/>
          <input type="submit" value="OK"/>
        </form>
        <input type="button" className="btn" value="Click me" onClick={this.showState}/>
      </div>
    )
  }
}

export default Experiment;
