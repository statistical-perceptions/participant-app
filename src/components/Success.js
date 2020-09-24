import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  sendExpt
} from "../actions/dataActions"

/**
 * Store answers
 * Lead participants to the demographics qualtrics survey
 */
class Success extends Component {
  componentDidMount() {
    // console.log(this.props);
    const username = this.props.expt.dbInfo.db;
    const expt = this.props.expt.dbInfo.col;
    // console.log(this.props.expt.exptToDisplay);
    if (!this.props.expt.answer.length == 0) {
      const finalObj = {
        participantID: this.props.expt.participantID
      }
      this.props.expt.answer.map(entry => {
        finalObj[entry.que] = entry.ans
      })
      finalObj["condition"] = this.props.expt.exptToDisplay.condition;
      // console.log(finalObj);
      this.props.sendExpt(username, expt, finalObj);
    }
  }

  render() {
    const link = this.props.expt.exptToDisplay.link;
    const participantID = this.props.expt.participantID;
    return (
      <div className="container">
        <h1>Thank you for your submission!</h1> <br/>
        You are <b>67%</b> done with the experiment! Now you will need to:  <br/><br/>
        1. Please copy your ID shown below: <br/>
        <b>{participantID}</b> <br/> 
        2. Please click on this <a href={link} target="_blank">link</a>, paste your ID in the first page and complete the final survey. 
      </div>
    )
  }
}

Success.propTypes = {
  sendExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  expt: state.expt,
})

export default connect(
  mapStateToProps,
  { sendExpt }
)(Success);
