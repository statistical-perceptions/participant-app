import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { 
  storeDBInfo,
  storePartID, 
  getExpt,
  storeQKeys,
  setNumQ,
  isFinalQ
} 
from "../actions/dataActions";

class PreviewEnterID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ParticipantID: ''
    }

    this.onChange = this.onChange.bind(this);
    this.showExpt = this.showExpt.bind(this);
  }

  componentDidMount() {
    this.getData();

    const username = this.props.match.params.username;
    const studyExpt = this.props.match.params.expt;
    this.props.storeDBInfo(username, studyExpt);
  }

  getData() {
    const username = this.props.match.params.username;
    const studyName = this.props.match.params.expt.split("-")[0];
    const exptName = this.props.match.params.expt.split("-")[1];
    this.props.getExpt(username, studyName, exptName);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showExpt() {
    this.props.storePartID(this.state.ParticipantID);
    const username = this.props.match.params.username;
    const studyExpt = this.props.match.params.expt;
    var questionKeys = [];
    if (this.props.expt.exptToDisplay) {
      const allKeys = Object.keys(this.props.expt.exptToDisplay);
      console.log(allKeys);
      // in the JSON file each question must have index q0, q1, q2, ... 
      questionKeys = allKeys.filter(str => str.charAt(0) == "q");
      this.props.storeQKeys(questionKeys);
    }
    // console.log(questionKeys);
    if (questionKeys.length == 1) {
      this.props.isFinalQ(true);
    }
    this.props.setNumQ(0);
    this.props.history.push("/preview/" + username + "/" + studyExpt + 
      "/" + questionKeys[0]);
  }

  render() {
    const exptName = this.props.match.params.expt;
      return (
        <div className="container">
        Experiment name: <br/>
        <b>{exptName}</b>
        <br/><br/>
        Enter your unique ID: <p></p>
        <input type="text" name="ParticipantID" 
          value={this.state.ParticipantID} onChange={this.onChange}/>
        <br/>
        <input type="button" className="btn" value="Start Experiment" 
          onClick={this.showExpt}/>
        <br/><br/>
        Hi Researchers! You may enter any ID to preview your experiment. <br/>
        Note: experiment preview will <b>NOT</b> record any data. 
      </div>
      )
  }
}

PreviewEnterID.propTypes = {
  storeDBInfo: PropTypes.func.isRequired,
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  storePartID: PropTypes.func.isRequired,
  participantID: PropTypes.string.isRequired,
  storeQKeys: PropTypes.func.isRequired,
  setNumQ: PropTypes.func.isRequired,
  isFinalQ: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  expt: state.expt,
  participantID: state.participantID
})

export default connect(
  mapStateToProps,
  { storeDBInfo, storePartID, getExpt, storeQKeys, setNumQ, isFinalQ }
)(PreviewEnterID);
