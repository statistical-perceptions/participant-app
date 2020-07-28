import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  sendExpt
} from "../actions/dataActions"

class Success extends Component {
  componentDidMount() {
    console.log(this.props);
    const username = this.props.expt.dbInfo.db;
    const expt = this.props.expt.dbInfo.col;
    if (!this.props.expt.answer.length == 0) {
      const finalObj = {
        participantID: this.props.expt.participantID
      }
      this.props.expt.answer.map(entry => {
        finalObj[entry.que] = entry.ans
      })
      console.log(finalObj);
      this.props.sendExpt(username, expt, finalObj);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Thank you for your submission!</h1> <br/>
        Please go back to the Qualtrics survey and complete 
        the rest of the questions. 
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
