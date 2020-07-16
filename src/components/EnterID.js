import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { storePartID } from "../actions/dataActions";

class EnterID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ParticipantID: ''
    }

    this.onChange = this.onChange.bind(this);
    this.showExpt = this.showExpt.bind(this);
  }

  componentDidMount() {
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showExpt() {
    this.props.storePartID(this.state.ParticipantID);
    const username = this.props.match.params.username;
    const studyExpt = this.props.match.params.expt;
    this.props.history.push("/" + username + "/" + studyExpt + "/experiment");
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
        <br/>
      </div>
      )
  }
}

EnterID.propTypes = {
  expt: PropTypes.object.isRequired,
  storePartID: PropTypes.func.isRequired,
  participantID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  expt: state.expt,
  participantID: state.participantID
})

export default connect(
  mapStateToProps,
  { storePartID }
)(EnterID);
