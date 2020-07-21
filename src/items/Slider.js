import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";

// This component should do the following:
// - Display question
// - Display an experiment item (in this case, a slider)
// - Store answer into Redux store upon submission 
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      question: this.props.question,
      lowRange: this.props.lowRange,
      highRange: this.props.highRange,
      value: 0,
    }

    this.onChange = this.onChange.bind(this);
    this.showSlider = this.showSlider.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const db = this.props.expt.dbInfo.db;
    // there will be problems if user's study name / experiment name inclues "-"
    const studyName = this.props.expt.dbInfo.col.split("-")[0];
    const exptName = this.props.expt.dbInfo.col.split("-")[1];
    this.props.getExpt(db, studyName, exptName);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  showSlider() {
    return (
      <div className="container">
        {this.state.question} <br/>
        <input 
          type="range"
          min={this.state.lowRange}
          max={this.state.highRange}
          name="value"
          value={this.state.value}
          onChange={this.onChange}
        />
        {this.state.value} <br/>
        {
          !this.state.submitted && 
          <input type="submit" className="btn" value="Ok"
            onClick={this.onSubmit}/>
        }
      </div>
    )
  }

  // part of template: 
  onSubmit() {
    console.log(this.props);
    const question = this.state.question;
    this.props.storeAnswer(question, this.state.value);
    this.state.submitted = true;
  }

  render() {
    return (
      <div>
        {this.showSlider()} <br/>
      </div>
    )
  }
}

Slider.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  storeAnswer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  expt: state.expt
})

export default connect(
  mapStateToProps,
  { getExpt, storeAnswer }
)(Slider);