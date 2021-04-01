import React, { Component } from 'react';
import './ThresholdSlider.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";


import {
    getExpt,
    storeAnswer
  } from "../actions/dataActions";

class ThresholdCurve extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
    this.resetState = this.resetState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.ThresholdCurve = this.ThresholdCurve.bind(this);
  }


  // setting the initial state of this component 
  get initialState() {
    return {
      // this submitted variable is required 
      submitted: false,
      // ###TODO###: add more variables below 
    };
  }

  resetState() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
    this.props.setWhichItem("threshold-slider");
  }

  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

  getData() {
    const db = this.props.expt.dbInfo.db;
    const studyName = this.props.expt.dbInfo.col.split("-")[0];
    const exptName = this.props.expt.dbInfo.col.split("-")[1];
    this.props.getExpt(db, studyName, exptName);
  }
 

}




ThresholdSliderSurvey.propTypes = {
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
)(ThresholdSliderSurvey);