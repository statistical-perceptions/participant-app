import React, { Component } from 'react';
import './NormalCurve.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";

class NormalCurveSurvey extends Component {
  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();
    this.rectRef = React.createRef();
    this.svgRef = React.createRef();
    this.areaRef = React.createRef();
    this.lengthRef = React.createRef();
    this.startPos1Ref = React.createRef();
    this.startPos2Ref = React.createRef();

    this.dotReturn = this.dotReturn.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.triMouseDown = this.triMouseDown.bind(this);
    this.triDrag = this.triDrag.bind(this);
    this.triUp = this.triUp.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);

    this.resetState = this.resetState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = this.initialState;
  }

  get initialState() {
    const unitHeight = this.props.data["max-height"];
    const circRad = this.props.data["circle-radius"];
    const len1 = this.props.data["len1"];
    const len2 = this.props.data["len2"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;

    const colNumInit = this.props.data["axis-length"];
    const internalLength = colNumInit * distancing;
    const edgeCol = Math.ceil(Math.max(len1, len2) / 2);
    const edgeLength = Math.max(len1, len2) * distancing;

    const ceilDist = height - 50;
    // const length = Math.ceil((distancing * this.props.data["len1"] * 2 + distancing * this.props.data["len2"] * 2) / 100) * 100;
    const length = edgeLength + internalLength;
    console.log(length);
    const colNum = Math.ceil(length / distancing);
    console.log(height, distancing, ceilDist, colNum);

    const axisStart = Math.ceil(edgeLength / 2);
    const axisStartCol = edgeCol;
    const axisWidth = length - ((len1 / 2 + 1) * distancing + (len2 / 2 + 1) * distancing - 1);
    const axisEndCol = internalLength / distancing;
    const axisEnd = axisEndCol * distancing;

    const triCent1 = (0.5 * len1 + 1) * distancing;
    const triCent2 = (0.5 * len2 + 1) * distancing;
    const triCentCol1 = Math.ceil(triCent1 / distancing);
    const triCentCol2 = Math.ceil(triCent2 / distancing);
    const triDist1 = triCentCol1 * distancing - triCent1;
    const triDist2 = triCentCol2 * distancing - triCent2;

    const variance1 = Math.abs(Math.ceil(len1 / 2) - axisStartCol);
    const variance2 = Math.abs(Math.ceil(len2 / 2) - axisStartCol);

    const startPos1 = this.props.data["startPos1"];
    let distancing1 = startPos1 + variance1 - 1;
    let col11 = startPos1;
    let col12 = startPos1 + len1 - 1;
    if (col11 + triCentCol1 < axisStartCol) {
      distancing1 = variance1 - 1;
      col11 = 0;
      col12 = len1 - 1;
    }
    else if (col11 + triCentCol1 > axisStartCol + axisEndCol) {
      distancing1 = variance1 + axisEndCol - 1;
      col11 = axisEndCol;
      col12 = axisEndCol + len1 - 1;
    }

    let startPos2 = this.props.data["startPos2"];
    let distancing2 = startPos2 + variance2 - 1;
    let col21 = startPos2;
    let col22 = startPos2 + len2 - 1;
    if (col21 + triCentCol2 < axisStartCol) {
      distancing2 = variance2 - 1;
      col21 = 0;
      col22 = len2 - 1;
    }
    else if (col21 + triCentCol2 > axisStartCol + axisEndCol) {
      distancing2 = variance2 + axisEndCol - 1;
      col21 = axisEndCol;
      col22 = axisEndCol + len2 - 1;
    }

    return {
      submitted: false,
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: length,
      svgHeight: height,
      svgX: 6,
      len1: len1,
      colValHeiS: this.props.data["colValHeiS"],
      len2: len2,
      colValHeiS2: this.props.data["colValHeiS2"],
      distancing: distancing,
      distancing1: distancing1 * distancing,
      distancing2: distancing2 * distancing,
      triCent1: triCent1,
      triCentCol1: triCentCol1,
      triCent2: triCent2,
      triCentCol2: triCentCol2,
      mousePointerRange: 0,
      triDown: false,
      col11: col11,
      col12: col12,
      col21: col21,
      col22: col22,
      colLim1: Math.round((length - (len1 * distancing)) / distancing),
      colLim2: Math.round((length - (len2 * distancing)) / distancing),
      overlapVals: this.props.data["overlapVals"],
      circRad: circRad,
      ceilDist: ceilDist,
      axisStart: axisStart,
      axisStartCol: axisStartCol,
      axisWidth: axisWidth,
      axisEnd: axisEnd,
      axisEndCol: axisEndCol,
      edgeCol: edgeCol,
      edgeLength: edgeLength,
      colNum: colNumInit,
      variance1: variance1,
      variance2: variance2,
      lowVal: this.props.data["lowVal"],
      showCoors: true
      // key1: key1,
      // key2: key2
    };
  }

  resetState() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
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

  onSubmit() {
    const question = this.props.questionNC;
    const key1 = this.props.graph1;
    const key2 = this.props.graph2;
    const answer = {
      [key1]: this.state.col11,
      [key2]: this.state.col21,
      area: this.state.overlapVals[
        Math.abs(this.state.col22 - this.state.col11)
      ]
    }
    this.props.storeAnswer(question, answer);
    this.setState({ submitted: true });
  }

  dotReturn(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing1 + this.state.distancing * xPosOrig + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    var hard = <circle className="icon" stroke="DarkCyan" fill="DarkCyan" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}></circle>;

    return hard;
  }

  dotReturn2(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing2 + this.state.distancing * xPosOrig + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    var hard = <circle className="icon" stroke="Crimson" fill="Crimson" fillOpacity="0.3" strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}></circle>;

    return hard;
  }

  svgColReturn(e, dragger) {
    let distFromCent;
    let variance;
    if (dragger === 1) {
      distFromCent = this.state.triCentCol1;
      variance = this.state.variance1;
    }
    else if (dragger === 2) {
      distFromCent = this.state.triCentCol2;
      variance = this.state.variance2;
    }
    var svg = this.svgRef.current;
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    e.preventDefault();
    var x = svgP.x - distFromCent + this.state.mousePointerRange;
    var col = Math.round((x - this.state.axisStart) / this.state.distancing) + variance;
    var colRelative = Math.round((x - this.state.axisStart) / this.state.distancing) + 1;
    console.log(col, colRelative, variance);
    return [col, colRelative];
  }

  svgColPlacement(col, colRelative, dragger) {
    if (dragger === 2) {
      if (col + this.state.triCentCol2 < this.state.axisStartCol) {
        this.setState({ distancing2: (this.state.variance2 - 1) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
      }
      else if (col + this.state.triCentCol2 > this.state.axisStartCol + this.state.axisEndCol) {
        this.setState({ distancing2: this.state.distancing * (this.state.variance2 + this.state.axisEndCol - 1), col21: this.state.axisEndCol, col22: this.state.axisEndCol + this.state.len2 - 1 })
      }
      else {
        this.setState({ distancing2: this.state.distancing * col, col21: colRelative, col22: colRelative + this.state.len2 - 1 });
      }
      this.curveArea();
    }
    else if (dragger === 1) {
      if (col + this.state.triCentCol1 < this.state.axisStartCol) {
        this.setState({ distancing1: (this.state.variance1 - 1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
      }
      else if (col + this.state.triCentCol1 > this.state.axisStartCol + this.state.axisEndCol) {
        this.setState({ distancing1: this.state.distancing * (this.state.variance1 + this.state.axisEndCol - 1), col11: this.state.axisEndCol, col12: this.state.axisEndCol + this.state.len1 - 1 })
      }
      else {
        this.setState({ distancing1: this.state.distancing * col, col11: colRelative, col12: colRelative + this.state.len1 - 1 });
      }
      this.curveArea();
      // this.setState({ distancing2 : x })
    }
  }

  triMouseDown(e, num) {
    if (e.type === "mousedown") {
      // console.log("MOUSEDOWN");
      e.preventDefault();
      var svgPre = this.svgRef.current;
      // Set mousePointerRange so that we know the distance
      // from the mouse tip to the x-value of the triangle
      // tip
      var ptPre = svgPre.createSVGPoint();
      ptPre.x = e.clientX;
      var svgPPre = ptPre.matrixTransform(svgPre.getScreenCTM().inverse());
      if (num === 1) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent1 + this.state.distancing1 - svgPPre.x
        }));
      }
      else if (num === 2) {
        this.setState(prevState => ({
          // rectX : svgP.x,
          triDown: num,
          mousePointerRange: prevState.triCent2 + this.state.distancing2 - svgPPre.x
        }));
      }
      // console.log(this.state);
    }
  }

  triDrag(e) {
    e.preventDefault();
    var dragger = this.state.triDown;
    var cols = this.svgColReturn(e, dragger);
    var col = cols[0];
    var colRelative = cols[1]
    console.log(col);
    this.svgColPlacement(col, colRelative, dragger);
    this.curveArea();
  }

  triUp(e) {
    // console.log("UP");
    if (this.state.triDown) {
      this.setState({ triDown: false });
    }
  }

  curveArea() {
    const col11 = this.state.col11 + this.state.variance1;
    const col12 = this.state.col12 + this.state.variance1;
    const col21 = this.state.col21 + this.state.variance2;
    const col22 = this.state.col22 + this.state.variance2;

    if (col11 > col22 || col12 < col21) {
      this.areaRef.current.innerHTML = 0;
    }
    else {
      // console.log(this.state.col22, this.state.col11, Math.abs(this.state.col22 - this.state.col11));
      this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(col22 - col11)];
    }
  }

  render() {
    return (
      <div
        onMouseMove={e => this.triDrag(e)}
        onMouseUp={e => this.triUp(e)}>
        <div className="container">
          <h3>Question: {this.props.questionNC}</h3>
        </div> 
        <svg width={this.state.svgWidth} height={this.state.svgHeight + 10} ref={this.svgRef}>
          {/* <rect opacity="0.2" width="100%" height="100%" fill="red"/> */}
          {[...Array(this.state.len1).keys()].map(
            (col) =>
              [...Array(this.state.colValHeiS[col]).keys()].map(
                (row) => this.dotReturn(col, row)
              )
          )}
          {[...Array(this.state.len2).keys()].map(
            (col) =>
              [...Array(this.state.colValHeiS2[col]).keys()].map(
                (row) => this.dotReturn2(col, row)
              )
          )}
          {/* <rect width={this.state.cursorWidth} fill="#000" x={this.state.rectX} y="5" height="150"
                    onMouseDown={e => this.dragMouseDown(e)}
                    
                    // onMouseMove={e => this.elementDrag(e)}
                    ref={this.rectRef}
                    ></rect> */}
          <rect width={this.state.axisEnd}
            height="2"
            fill="black"
            x={this.state.axisStart - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisStart - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisEnd + this.state.axisStart - 1}
            y={this.state.ceilDist + 20} />
          <polygon
            points={
              [
                [this.state.triCent1 + this.state.distancing1 - 15, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1 + 15, this.state.ceilDist + 35],
                [this.state.triCent1 + this.state.distancing1, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 1)}
          />
          <polygon
            points={
              [
                [this.state.triCent2 + this.state.distancing2 - 15, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2 + 15, this.state.ceilDist + 35],
                [this.state.triCent2 + this.state.distancing2, this.state.ceilDist + 20]
              ]
            }
            onMouseDown={(e, num) => this.triMouseDown(e, 2)}
          />
          <text text-anchor="middle" x={this.state.axisStart} y={this.state.ceilDist + 55}>{this.state.lowVal}</text>
          <text text-anchor="middle" x={this.state.axisStart + this.state.axisEnd} y={this.state.ceilDist + 55}>{this.state.lowVal + this.state.colNum}</text>
                    Sorry, please use a different browser.
                </svg>
        <br />
        <div class="boxed">
          <div class="color-box" style={{ backgroundColor: "DarkCyan" }}></div>
          {this.props.graph1}
          <br />
          <div class="color-box" style={{ backgroundColor: "Crimson" }}></div>
          {this.props.graph2}
        </div>
        <br />
        <h4>Area Under Curve: <span ref={this.areaRef}></span> | First x-coordinate: {this.state.col11} | Second x-coordinate: {this.state.col21} </h4>
        {
          !this.state.submitted && 
          <div>
            <input type="submit" className="btn" value="Ok"
              onClick={this.onSubmit}/> <br/>
            <p style={{ color: "grey" }}>
              Reminder: Once you click "OK", your response to this question 
              will be recorded, and you won't be able to change your answer. 
            </p>
          </div>
        }
      </div>
    )
  }
}

NormalCurveSurvey.propTypes = {
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
)(NormalCurveSurvey);