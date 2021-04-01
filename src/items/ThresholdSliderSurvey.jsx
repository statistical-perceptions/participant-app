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
    