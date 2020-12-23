import React, { Component } from 'react';
import * as d3 from "d3";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import './HistSlider.css';

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";

class Histogram extends Component {
  constructor(props) {
    super(props);
    
    this.sliderRef = React.createRef();
    this.graphRef = React.createRef();
    this.qRef = React.createRef();
    this.minRef = React.createRef();
    this.maxRef = React.createRef();

    this.state = this.initialState;

    this.onChange = this.onChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  get initialState() {
    return {
      submitted: false,
      checked: false,
      minVal: Number,
      maxVal: Number,
      sliderPos: Number
    }
  }

    resetState() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
    this.drawChart();
    this.props.setWhichItem("threshold");
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit() {
    const question = this.props.questionHistKey;
    const answer = this.state.sliderPos;
    this.props.storeAnswer(question, answer);
    this.setState({ submitted: true });
  }

  drawChart() {
    const data = this.props.histData.data;

    const svg = d3.select(this.graphRef.current).append("svg")
      .attr("width", this.props.histData.width)
      .attr("height", this.props.histData.height)

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * this.props.histData.width / data.length)
      .attr("y", (d, i) => this.props.histData.height - 10 * d)
      .attr("width", this.props.histData.width / data.length - 10)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "#4CAF50")
      .attr("opacity", 0.5)

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * this.props.histData.width / data.length)
      .attr("y", (d, i) => this.props.histData.height - (10 * d) - 3)
  }

  render() {
    const vertAlign = this.props.histData.height / 2;
    // const step_size = this.props.width / this.props.data.length;
    return (
      <div>
        <b>Question: </b> <br/>
        {this.props.questionHist}
        <div ref={this.graphRef}
          style={{ 
            position: "relative", 
            width: this.props.histData.width, 
            margin: "auto" }}>
          <div 
            style={{ 
              position: "absolute",
              top: vertAlign}}>
            <input type="range" min={this.props.histLowRange} max={this.props.histHighRange} 
              className="hist-slider" onChange={this.onChange}
              name="sliderPos" value={this.state.sliderPos}
              step={this.props.histData.step} ref={this.sliderRef}
              style={{ width: this.props.histData.width }}/>
          </div>
        </div>
        {this.props.histLowRange}
        <input type="range" class="dummy-slider" 
          style={{ width: this.props.histData.width }} onChange={this.onChange}
          name="sliderPos" value={this.state.sliderPos} 
          step={this.props.histData.step}
          min={this.props.histLowRange} max={this.props.histHighRange} />
        {this.props.histHighRange}
        <br/>
        Slider Position: {this.state.sliderPos}
        
        <br/><br/>
          {
          !this.state.submitted && 
          <div>
            <input type="submit" className="btn" value="I Confirm My Answer"
              onClick={this.onSubmit}/> <br/>
            <p style={{ color: "grey" }}>
              Reminder: Once you click "I Confirm My Answer", your response to this question 
              will be recorded, and you won't be able to change your answer. 
            </p>
          </div>
        }
      </div>
    )
  }
}

Histogram.propTypes = {
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
)(Histogram);