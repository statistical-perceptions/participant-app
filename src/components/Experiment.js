import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { getExpt } from "../actions/dataActions";

import './Slider.css'

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.displayExpt();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit() {

  }

  getData() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.expt.split("-")[0];
    const exptName = this.props.match.params.expt.split("-")[1];
    this.props.getExpt(username, studyName, exptName);
  }

  displayExpt() {
    const expt = this.props.expt.exptToDisplay;
    const allKeys = Object.keys(expt);
    const questionKeys = allKeys.filter(k =>
      k != "userID" && k != "exptName" && k != "count" && k != "type");
    console.log(questionKeys);

    // return questionKeys.map(k => {
    //   if (expt[k]) {
    //     if (expt[k]["Type"] == "slider") {
    //       const lowRange = expt[k]["lowRange"];
    //       const highRange = expt[k]["highRange"];
    //       const question = expt[k]["Question"];
    //       return (
    //         <div className="container">
    //           <form onSubmit={this.onSubmit}>
    //             {question} <br/><br/>
    //             <input 
    //               type="range" 
    //               min={lowRange} 
    //               max={highRange}
    //               name="value"
    //               value={this.state.value}
    //               onChange={this.onChange}
    //             />
    //             {this.state.value}
    //             <br/>
    //             <input type="submit" className="btn"/>
    //           </form>
    //         </div>
    //       );
    //     }
    //   }
    // })
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
    const participant = this.props.expt.participantID;
    return (
      <div className="container">
      Experiment name: <br/>
      <b>{exptName}</b>
      <br/>
      Participant ID: <br/>
      <b>{participant}</b>
      <br/><br/>
      {this.displayExpt()}
    </div>
    )
  }
}

Experiment.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  participantID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  expt: state.expt,
  participantID: state.participantID
})

export default connect(
  mapStateToProps,
  { getExpt }
)(Experiment);
