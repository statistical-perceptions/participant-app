import React, { Component } from 'react';
import './NormalCurve.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";
import { forceCenter } from 'd3';

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
    this.tagRef1 = React.createRef();
    this.tagRef2 = React.createRef();

    this.dotReturn = this.dotReturn.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.triMouseDown = this.triMouseDown.bind(this);
    this.triDrag = this.triDrag.bind(this);
    this.triUp = this.triUp.bind(this);
    this.curveArea = this.curveArea.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);
    this.svgColReturn = this.svgColReturn.bind(this);
    this.updateTag1 = this.updateTag1.bind(this);
    this.updateTag2 = this.updateTag2.bind(this);
    this.displayTag1 = this.displayTag1.bind(this);
    this.displayTag2 = this.displayTag2.bind(this);
    this.hideTag1 = this.hideTag1.bind(this);
    this.hideTag2 = this.hideTag2.bind(this);
    this.returnTri1 = this.returnTri1.bind(this);
    this.returnTri2 = this.returnTri2.bind(this);

    this.resetState = this.resetState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.noAnswer = this.noAnswer.bind(this);

    this.state = this.initialState;
  }

  get initialState() {
    const data = this.props.data;
    // console.log(data);
    const unitHeight = data["max-height"];
    const circRad = data["circle-radius"];
    const len1 = data["len1"];
    const len2 = data["len2"];
    const distancing = circRad * 4 - 1;
    const height = (Math.ceil((distancing * unitHeight) / 50) + 1) * 50;

    const colNumInit = data["axis-length"];
    const internalLength = colNumInit * distancing;
    const edgeCol = Math.ceil(Math.max(len1, len2) / 2);
    const edgeLength = Math.max(len1, len2) * distancing;

    const ceilDist = height - 50;
    const length = edgeLength + internalLength;
    const colNum = Math.ceil(length / distancing);

    const axisStart = Math.ceil(edgeLength / 2);
    const axisStartCol = edgeCol;
    // console.log("startCol", axisStartCol);
    const axisWidth = length - ((len1 / 2 + 1) * distancing + (len2 / 2 + 1) * distancing - 1);
    const axisEndCol = internalLength / distancing;
    const axisEnd = axisEndCol * distancing;

    const triCent1 = Math.ceil(0.5 * len1) * distancing;
    const triCent2 = Math.ceil(0.5 * len2) * distancing;
    const triCentCol1 = Math.ceil(triCent1 / distancing);
    const triCentCol2 = Math.ceil(triCent2 / distancing);
    // console.log("triCentCol1: ", triCentCol1);
    // console.log("triCentCol2: ", triCentCol2);

    const variance1 = Math.abs(Math.ceil(len1 / 2) - axisStartCol);
    const variance2 = Math.abs(Math.ceil(len2 / 2) - axisStartCol);

    let edgeLim;
    if ("edgeLim" in data) {
      edgeLim = data["edgeLim"];
    }
    else {
      edgeLim = true;
    }

    const startPos1 = data["startPos1"];
    let distancing1 = startPos1 + variance1 - 1;
    let col11 = startPos1 + variance1;
    let col12 = startPos1 + len1 - 1;
    let col11Rel = startPos1;

    let variance = axisStartCol - variance1;
    if (edgeLim) {
      if (col11 < axisStartCol - 1) {
        distancing1 = (axisStartCol - 1) * distancing;
        col11 = 0;
        col12 = len1 - 1;
      }
      else if (col11 + len1 + 1 > axisStartCol + axisEndCol) {
        const endCol = axisEndCol - len1;
        distancing1 = distancing * (axisStartCol + endCol - 1);
        col11 = endCol;
        col12 = endCol + len2 - 1;
      }
      else {
        distancing1 = distancing * col11;
        col11 = col11Rel - variance;
        col12 = col11Rel - variance + len1 - 1;
      }
    }
    else {
      // col11 = col11 - 1;
      if (col11 + triCentCol1 < axisStartCol) {
        distancing1 = (variance1) * distancing;
        col11 = 0;
        col12 = len1 - 1;
      }
      else if (col11 + triCentCol1 > axisStartCol + axisEndCol) {
        distancing1 = distancing * (variance1 + axisEndCol);
        col11 = axisEndCol;
        col12 = axisEndCol + len1 - 1;
      }
      else {
        distancing1 = distancing * (col11);
        col11 = col11Rel;
        col12 = col11Rel + len1 - 1;
      }
    }

    const startPos2 = data["startPos2"];
    let distancing2 = startPos2 + variance2 - 1;
    let col21 = startPos2 + variance2;
    let col22 = startPos2 + len2 - 1;
    let col21Rel = startPos2;

    variance = axisStartCol - variance2;
    if (edgeLim) {
      if (col21 < axisStartCol - 1) {
        distancing2 = (axisStartCol - 1) * distancing;
        col21 = 0;
        col22 = len2 - 1;
      }
      else if (col21 + len2 + 1 > axisStartCol + axisEndCol) {
        const endCol = axisEndCol - len2;
        distancing2 = distancing * (axisStartCol + endCol);
        col21 = endCol;
        col22 = endCol + len2 - 1;
      }
      else {
        distancing2 = distancing * col21;
        col21 = col21Rel - variance;
        col22 = col21Rel - variance + len2 - 1;
      }
    }
    else {
      // col21 = col21 - 1;
      if (col21 + triCentCol2 < axisStartCol) {
        distancing2 = (variance2) * distancing;
        col21 = 0;
        col22 = len2 - 1;
      }
      else if (col21 + triCentCol2 > axisStartCol + axisEndCol) {
        distancing2 = distancing * (variance2 + axisEndCol - 1);
        col21 = axisEndCol;
        col22 = axisEndCol + len2 - 1;
      }
      else {
        distancing2 = distancing * (col21);
        col21 = col21Rel;
        col22 = col21Rel + len2 - 1;
      }
    }

    let colNumVal;
    if ("colNumVal" in data) {
      colNumVal = this.props.data["colNumVal"];
    }
    else {
      colNumVal = 1;
    }

    let tickNum;
    let tickDist;
    let rangeVal;
    const axisLength = colNumInit * colNumVal;
    // console.log("tickNum", data["tickNum"], axisLength % (parseInt(data["tickNum"]) + 1) === 0);
    if ("tickNum" in data && axisLength % (parseInt(data["tickNum"]) + 1) === 0) {
      tickNum = parseInt(data["tickNum"]);
      tickDist = colNumInit * distancing / (tickNum + 1);
      rangeVal = axisLength / (tickNum + 1);
    }
    else {
      tickNum = 0;
      tickDist = axisLength;
      rangeVal = axisLength;
    }

    let fixCurve1;
    if ("fixCurve1" in data) {
      fixCurve1 = data["fixCurve1"];
    }
    else {
      fixCurve1 = false;
    }

    let fixCurve2;
    if ("fixCurve2" in data) {
      fixCurve2 = data["fixCurve2"];
    }
    else {
      fixCurve2 = false;
    }

    let maxLength = len1;
    if (len2 > len1) {
      maxLength = len2;
    }

    let color1;
    if ("color1" in data) {
      color1 = data["color1"];
    }
    else {
      color1 = "CornflowerBlue";
    }

    let color2;
    if ("color2" in data) {
      color2 = data["color2"];
    }
    else {
      color2 = "Crimson";
    }

    return {
      submitted: false,
      axisLength: data["axis-length"],
      startPos1: data["startPos1"],
      startPos2: data["startPos2"],
      x: 0, y: 0, isDown: false,
      rectX: 12.5,
      down: false,
      svgWidth: length,
      svgHeight: height,
      svgX: 6,
      len1: len1,
      colValHeiS: data["colValHeiS"],
      len2: len2,
      colValHeiS2: data["colValHeiS2"],
      distancing: distancing,
      distancing1 : distancing1,
      distancing2: distancing2,
      triCent1: triCentCol1 * distancing,
      triCentCol1: triCentCol1,
      triCent2: triCentCol2 * distancing,
      triCentCol2: triCentCol2,
      mousePointerRange: 0,
      triDown: false,
      col11: col11,
      col12: col12,
      col21: col21,
      col22: col22,
      colLim1: Math.round((length - (len1 * distancing)) / distancing),
      colLim2: Math.round((length - (len2 * distancing)) / distancing),
      overlapVals: data["overlapVals"],
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
      showCoors: true,
      colNumVal: colNumVal,
      tickNum: tickNum,
      tickDist: tickDist,
      rangeVal: rangeVal,
      edgeLim: edgeLim,
      fixCurve1: fixCurve1,
      fixCurve2: fixCurve2,
      maxLength: maxLength,
      color1: color1,
      color2: color2
    };
  }

  resetState() {
    this.setState(this.initialState);
  }

  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
    this.props.setWhichItem("normal-curve");
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
    const question = this.props.questionNCKey;
    const key1 = this.props.graph1legend;
    const key2 = this.props.graph2legend;
    const answer = {
      [key1]: this.state.col11,
      [key2]: this.state.col21,
      area: this.areaRef.current.innerHTML
    }
    this.props.storeAnswer(question, answer);
    this.setState({ submitted: true });
  }

  noAnswer() {
    const question = this.props.questionNCKey;
    const answer = "Prefer Not to Answer";
    this.props.storeAnswer(question, answer);
    this.setState({ submitted: true });
  }

  dotReturn(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing1 + this.state.distancing * (xPosOrig + 1) + this.state.circRad - this.state.maxLength + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    var hard = 
    [<circle 
    onMouseEnter={e => this.displayTag1(e)}
    onMouseLeave={e => this.hideTag1(e)}
    onMouseMove={e => this.updateTag1(e)} 
    className="icon circle1" 
    stroke={this.state.color1}
    fill={this.state.color1}
    fillOpacity="0.3" 
    strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}>
    </circle>,
    <circle
    onMouseEnter={e => this.displayTag1(e)}
    onMouseLeave={e => this.hideTag1(e)}
    onMouseMove={e => this.updateTag1(e)} 
    className="icon circle1" 
    stroke={this.state.color1}
    fill={this.state.color1}
    fillOpacity="0" 
    strokeOpacity="0" cx={CX} cy={CY} r={this.state.distancing}>
    </circle>];

    return hard;
  }

  dotReturn2(xPos, yPos) {
    const xPosOrig = xPos;

    const CX = this.state.distancing2 + this.state.distancing * (xPosOrig + 1) + this.state.circRad - this.state.maxLength + 10;
    const CY = this.state.ceilDist - this.state.distancing * yPos + 10;

    var hard = 
    [<circle 
    onMouseEnter={e => this.displayTag2(e)}
    onMouseLeave={e => this.hideTag2(e)}
    onMouseMove={e => this.updateTag2(e)} 
    className="icon circle2" 
    stroke={this.state.color2}
    fill={this.state.color2}
    fillOpacity="0.3" 
    strokeOpacity="0.3" cx={CX} cy={CY} r={this.state.circRad}>
    </circle>,
    <circle
    onMouseEnter={e => this.displayTag2(e)}
    onMouseLeave={e => this.hideTag2(e)}
    onMouseMove={e => this.updateTag2(e)} 
    className="icon circle2" 
    stroke={this.state.color2}
    fill={this.state.color2}
    fillOpacity="0" 
    strokeOpacity="0" cx={CX} cy={CY} r={this.state.distancing}>
    </circle>];

    return hard;
  }

  returnTri1() {
    if (this.state.fixCurve1) {
      return (null);
    }
    else {
      return (
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
      )
    }
  }

  returnTri2() {
    if (this.state.fixCurve2) {
      return (null);
    }
    else {
      return (
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
      )
    }
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
    var colRelative = Math.round((x - this.state.axisStart) / this.state.distancing) - 1;
    return [col, colRelative];
  }

  svgColPlacement(col, colRelative, dragger) {
    // console.log(col, colRelative);
    // console.log(this.state.axisStartCol);
    // console.log(this.state.axisStart);
    if (this.state.edgeLim) {
      if (dragger === 2) {
        const variance = this.state.axisStartCol - this.state.variance2;
        if (col < this.state.axisStartCol - 1) {
          // console.log("edge");
          this.setState({ distancing2: (this.state.axisStartCol - 1) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
        }
        else if (col + this.state.len2 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          const endCol = this.state.axisEndCol - this.state.len2;
          this.setState({ distancing2: this.state.distancing * (this.state.axisStartCol + endCol - 1), col21: endCol, col22: endCol + this.state.len2 - 1 })
        }
        else {
          this.setState({ distancing2: this.state.distancing * col, col21: colRelative - variance, col22: colRelative - variance + this.state.len2 - 1 });
        }
        this.curveArea();
      }
      else if (dragger === 1) {
        const variance = this.state.axisStartCol - this.state.variance1;
        if (col < this.state.axisStartCol - 1) {
          this.setState({ distancing1: (this.state.axisStartCol - 1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
        }
        else if (col + this.state.len1 + 1 > this.state.axisStartCol + this.state.axisEndCol) {
          const endCol = this.state.axisEndCol - this.state.len1;
          this.setState({ distancing1: this.state.distancing * (this.state.axisStartCol + endCol - 1), col11: endCol, col12: endCol + this.state.len1 - 1 })
        }
        else {
          this.setState({ distancing1: this.state.distancing * col, col11: colRelative - variance, col12: colRelative - variance + this.state.len1 - 1 });
        }
        this.curveArea();
      }
    }
    else {
      col = col - 1;
      if (dragger === 2) {
        // colRelative = colRelative - this.state.axisStartCol + this.state.variance2;
        if (col + this.state.triCentCol2 < this.state.axisStartCol) {
          this.setState({ distancing2: (this.state.variance2) * this.state.distancing, col21: 0, col22: this.state.len2 - 1 });
        }
        else if (col + this.state.triCentCol2 > this.state.axisStartCol + this.state.axisEndCol) {
          this.setState({ distancing2: this.state.distancing * (this.state.variance2 + this.state.axisEndCol), col21: this.state.axisEndCol, col22: this.state.axisEndCol + this.state.len2 - 1 })
        }
        else {
          this.setState({ distancing2: this.state.distancing * col, col21: colRelative, col22: colRelative + this.state.len2 - 1 });
        }
        this.curveArea();
      }
      else if (dragger === 1) {
        // colRelative = colRelative - this.state.axisStartCol + this.state.variance1;
        if (col + this.state.triCentCol1 < this.state.axisStartCol) {
          this.setState({ distancing1: (this.state.variance1) * this.state.distancing, col11: 0, col12: this.state.len1 - 1 });
        }
        else if (col + this.state.triCentCol1 > this.state.axisStartCol + this.state.axisEndCol) {
          this.setState({ distancing1: this.state.distancing * (this.state.variance1 + this.state.axisEndCol), col11: this.state.axisEndCol, col12: this.state.axisEndCol + this.state.len1 - 1 })
        }
        else {
          this.setState({ distancing1: this.state.distancing * col, col11: colRelative, col12: colRelative + this.state.len1 - 1 });
        }
        this.curveArea();
      }
    }
  }

  triMouseDown(e, num) {
    if (e.type === "mousedown") {
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
          triDown: num,
          mousePointerRange: prevState.triCent2 + this.state.distancing2 - svgPPre.x
        }));
      }
    }
  }

  triDrag(e) {
      e.preventDefault();
      var dragger = this.state.triDown;
      var cols = this.svgColReturn(e, dragger);
      var col = cols[0];
      var colRelative = cols[1]
      this.svgColPlacement(col, colRelative, dragger);
      this.curveArea();
  }

  triUp(e) {
    if (this.state.triDown) {
      this.setState({ triDown: false });
    }
  }

  curveArea() {
    let col11;
    let col12;
    let col21;
    let col22;

    if (this.state.edgeLim) {
      col11 = this.state.col11;
      col12 = this.state.col12;
      col21 = this.state.col21;
      col22 = this.state.col22;
    }
    else {
      col11 = this.state.col11 + this.state.variance1;
      col12 = this.state.col12 + this.state.variance1;
      col21 = this.state.col21 + this.state.variance2;
      col22 = this.state.col22 + this.state.variance2;
    }

    if (col11 > col22 || col12 < col21) {
      this.areaRef.current.innerHTML = 0;
    }
    else {
      this.areaRef.current.innerHTML = this.state.overlapVals[Math.abs(col22 - col11)];
    }
  }

  updateTag1(e) {
    e.preventDefault()
    var x = e.clientX,
        y = e.clientY;

    const elem = this.tagRef1.current;
    elem.style.top = (y + 5) + 'px';
    elem.style.left = (x + 5) + 'px';
  }

  updateTag2(e) {
    e.preventDefault();
    var x = e.clientX,
        y = e.clientY;

    const elem = this.tagRef2.current;
    elem.style.top = (y + 5) + 'px';
    elem.style.left = (x + 5) + 'px';
  }

  displayTag1(e) {
    e.preventDefault();
    this.tagRef1.current.style.display = "block";
  }

  displayTag2(e) {
    e.preventDefault();
    this.tagRef2.current.style.display = "block";
  }

  hideTag1(e) {
    e.preventDefault();
    this.tagRef1.current.style.display = "none";
  }

  hideTag2(e) {
    e.preventDefault();
    this.tagRef2.current.style.display = "none";
  }

  render() {
    return (
      <div 
        onMouseMove={e => this.triDrag(e)}
        onMouseUp={e => this.triUp(e)}>
        <div className="container">
          <h3>Question: </h3>
          <div style={{ width: "60%", margin: "auto" }}>
            <p style={{ textAlign: "left" }}>
              {this.props.questionNC}
            </p>
          </div>
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
            x={this.state.axisStartCol * this.state.distancing - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisStartCol * this.state.distancing - 1}
            y={this.state.ceilDist + 20} />
          <rect width="2"
            height="20"
            fill="black"
            x={this.state.axisEnd + this.state.axisStartCol * this.state.distancing - 1}
            y={this.state.ceilDist + 20} />
          {/* triangle rendering below */}
          {this.returnTri1()}
          {this.returnTri2()}
          {[...Array(this.state.tickNum).keys()].map(
            (tick) =>
              <rect
                width="2"
                height="20"
                fill="black"
                x={this.state.axisStart + (this.state.tickDist * (tick + 1)) - 1} 
                y={this.state.ceilDist + 20}
              />
          )}
          {[...Array(this.state.tickNum).keys()].map(
            (tick) =>
            <text 
            textAnchor="middle" 
            x={this.state.axisStart + (this.state.tickDist * (tick + 1)) - 1} 
            y={this.state.ceilDist + 55}>
              {this.state.lowVal + (this.state.rangeVal * (tick + 1))}
            </text>
          )}
          <text text-anchor="middle" x={this.state.axisStart} y={this.state.ceilDist + 55}>{this.state.lowVal}</text>
          <text text-anchor="middle" x={this.state.axisStart + this.state.axisEnd} y={this.state.ceilDist + 55}>{this.state.lowVal + this.state.colNum}</text>
          Sorry, please use a different browser.
        </svg>
        <br />
        <div class="boxed">
          <div class="color-box" style={{ backgroundColor: this.state.color1 }}></div>
          {this.props.graph1}
          <br />
          <div class="color-box" style={{ backgroundColor: this.state.color2 }}></div>
          {this.props.graph2}
        </div>
        <br />
        <h4>First x-coordinate: {this.state.col11} | Second x-coordinate: {this.state.col21} </h4>
        <span style={{ color: "white" }} ref={this.areaRef}></span>
        {
          !this.state.submitted && 
          <div>
            <input type="submit" className="extraPadding" value="I Confirm My Answer"
              onClick={this.onSubmit}/> <br/>
            <p style={{ color: "grey", width: "40%", margin: "auto" }}>
              Reminder: Once you click "I Confirm My Answer", your response to this question 
              will be recorded, and you won't be able to change your answer. 
            </p> <br/>
            <input type="submit" className="btn" value="I Prefer Not to Answer"
              onClick={this.noAnswer}/>
          </div>
        }
        <span 
        className="tag1" 
        ref={this.tagRef1}
        >{this.props.graph1}</span>
        
        <span 
        className="tag2" 
        ref={this.tagRef2}
        >{this.props.graph2}</span>
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