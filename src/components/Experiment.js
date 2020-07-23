import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { 
  getExpt,
  sendExpt,
  isFinalQ,
  storeAnswer
} from "../actions/dataActions";

import Slider from "../items/Slider"

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onFinalSubmit = this.onFinalSubmit.bind(this);
    this.whichSubmit = this.whichSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();

    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    if (!this.props.expt.participantID) {
      alert("Please enter your unique ID");
      this.props.history.push("/expt/" + username + "/" + expt);
    }
  }

  onSubmit() {
    this.childSlider.resetState();

    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;

    // checking if the next question is the final question 
    // we have to regulate name of question (such as q0, q1, q2 ...)
    // because we are not using mongoose schema
    const currentQ = this.props.match.params.qKey.charAt(1);
    const nextQ = Number(currentQ) + 1;
    const lastQ = this.props.expt.questionKeys[this.props.expt.questionKeys.length - 1];
    if (nextQ == Number(lastQ.charAt(1))) {
      this.props.isFinalQ(true);
    }

    this.props.history.push("/expt/" + username + "/" + expt + 
      "/q" + nextQ.toString());
  }

  onFinalSubmit() {
    this.props.history.push("/success");
  }

  whichSubmit() {
    return (
      <div>
        {
          !this.props.expt.isFinalQ ? 
          <input type="submit" className="btn" value="Next Question"
            onClick={this.onSubmit}/> :
          <div>
            This is the final question. <p></p>
            <input type="submit" className="btn" value="Submit"
              onClick={this.onFinalSubmit}/>
          </div>
        }
      </div>
    )
  }

  getData() {
    const username = this.props.match.params.username;
    // there will be problems if user's study name / experiment name inclues "-"
    const studyName = this.props.match.params.expt.split("-")[0];
    const exptName = this.props.match.params.expt.split("-")[1];
    this.props.getExpt(username, studyName, exptName);
  }

  displayExpt() {
    const expt = this.props.expt.exptToDisplay;
    const key = this.props.match.params.qKey;
    if (expt[key]) {
      // ###TODO### add more if statements here for your experiment type
      // follow the following format
      switch(expt[key]["Type"]) {
        case "slider":
          const lowRange = expt[key]["lowRange"];
          const highRange = expt[key]["highRange"];
          const question = expt[key]["Question"];
          return (
            <div className="container">
              <Slider childRef={ref => (this.childSlider = ref)}
                question={question} lowRange={lowRange} 
                highRange={highRange} />
              <br/>
              {/* keep the following line */}
              <this.whichSubmit />
            </div>
          )
          break;
        default: 
          return (<div>Unknown Experiment Type</div>)
      }
    }
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
  participantID: PropTypes.string.isRequired,
  sendExpt: PropTypes.func.isRequired,
  isFinalQ: PropTypes.func.isRequired,
  storeAnswer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  expt: state.expt,
  participantID: state.participantID
})

export default connect(
  mapStateToProps,
  { getExpt, sendExpt, isFinalQ, storeAnswer }
)(Experiment);
