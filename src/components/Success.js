import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  sendExpt
} from "../actions/dataActions"

class Success extends Component {
  componentDidMount() {
    console.log(this.props);
    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    if (!this.props.expt.answer.length == 0) {
      const finalObj = {
        participantID: this.props.expt.participantID
      }
      this.props.expt.answer.map(entry => {
        finalObj[entry.que] = entry.ans
      })
      this.props.sendExpt(username, expt, finalObj);
    }
  }

  onClose() {
    window.opener = null;
    window.open("", "_self");
    window.close();
  }

  render() {
    return (
      <div className="container">
        <h1>Thank you for your submission!</h1> <br/>
        <button onClick={this.onClose}>Close tab</button> 
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
