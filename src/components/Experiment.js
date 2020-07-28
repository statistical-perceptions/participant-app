import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { 
  getExpt,
  sendExpt,
  setNumQ,
  isFinalQ,
  storeAnswer,
  getItemData
} from "../actions/dataActions";

import Slider from "../items/Slider";
import NormalCurve from "../items/NormalCurve.jsx"

class Experiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichItem: ""
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onFinalSubmit = this.onFinalSubmit.bind(this);
    this.whichSubmit = this.whichSubmit.bind(this);
    this.setWhichItem = this.setWhichItem.bind(this);
  }

  setWhichItem(str) {
    this.setState({ whichItem: str })
  }

  componentDidMount() {
    this.getData();

    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;
    if (!this.props.expt.participantID) {
      alert("Please enter your unique ID");
      this.props.history.push("/expt/" + username + "/" + expt);
    }

    console.log(this.props.expt);
  }

  nextQuestion() {
    const username = this.props.match.params.username;
    const expt = this.props.match.params.expt;

    // checking if the next question is the final question 
    // we have to regulate name of question (such as q0, q1, q2 ...)
    // because we are not using mongoose schema
    const currentQ = this.props.match.params.qKey.charAt(1);
    // instead of +1, we need to do next in questionKeys arr.
    const nextQ = this.props.expt.questionKeys[this.props.expt.numQ + 1];
    const lastQ = this.props.expt.questionKeys[this.props.expt.questionKeys.length - 1];
    if (nextQ == lastQ) {
      this.props.isFinalQ(true);
    }

    // set num q to + 1 of current
    this.props.setNumQ(this.props.expt.numQ + 1);
    this.props.history.push("/expt/" + username + "/" + expt + 
      "/" + nextQ.toString());
  }

  onSubmit() {
    // switch (this.state.whichItem) {
    //   case "slider":
    //     this.childSlider.resetState();
    //     this.nextQuestion();
    //   case "normal-curve":
    //     this.childNormalCurve.resetState();
    //     this.nextQuestion();
    //   default: 
    //     return (<div>Unknown Experiment Type</div>)
    // }
    if (this.childSlider) {
      this.childSlider.resetState();
      this.nextQuestion();
    };
    if (this.childNormalCurve) {
      this.childNormalCurve.resetState();
      this.nextQuestion();
    }; 
  }

  onFinalSubmit() {
    this.props.history.push("/success");
  }

  whichSubmit() {
    return (
      <div>
        {
          !this.props.expt.isFinalQ ? 
          <input type="submit" className="btn" value="Next Question"
            onClick={this.onSubmit}/> :
          <div>
            This is the final question. <p></p>
            <input type="submit" className="btn" value="Submit"
              onClick={this.onFinalSubmit}/>
          </div>
        }
      </div>
    )
  }

  getData() {
    const username = this.props.match.params.username;
    // there will be problems if user's study name / experiment name inclues "-"
    const studyName = this.props.match.params.expt.split("-")[0];
    const exptName = this.props.match.params.expt.split("-")[1];
    this.props.getExpt(username, studyName, exptName);
  }

  displayExpt() {
    const username = this.props.match.params.username;
    const expt = this.props.expt.exptToDisplay;
    const key = this.props.match.params.qKey;
    if (expt[key]) {
      // ###TODO### add more if statements here for your experiment type
      // follow the following format
      switch(expt[key]["Type"]) {
        case "slider":
          const lowRange = expt[key]["lowRange"];
          const highRange = expt[key]["highRange"];
          const question = expt[key]["Question"];
          return (
            <div className="container">
              <Slider childRef={ref => (this.childSlider = ref)}
                question={question} lowRange={lowRange} 
                highRange={highRange} setWhichItem={this.setWhichItem}/>
              <br/>
              {/* keep the following line */}
              <this.whichSubmit />
            </div>
          )
          break;
        case "normal-curve":
          const questionNC = expt[key]["Question"];
          const graph1 = expt[key]["Data1"];
          const graph2 = expt[key]["Data2"];
          const dataFileName = expt[key]["FileName"];
          const dataFileContent = expt[key]["FileContent"];
          // this line should not be put here. it's overloading the API
          // this.props.getItemData(username, dataFileName);
          // if (!Object.keys(this.props.expt.fileContent).length == 0) {
          //   console.log(this.props.expt.fileContent);
          // }
          return (
            <div className="container">
              <NormalCurve childRef={ref => (this.childNormalCurve = ref)} 
                questionNC={questionNC} graph1={graph1} graph2={graph2} 
                fileName={dataFileName} data={dataFileContent} 
                setWhichItem={this.setWhichItem} />
              <br/>
              <this.whichSubmit />
            </div>
          )
        default: 
          return (<div>Unknown Experiment Type</div>)
      }
    }
  }


  render() {
    const exptName = this.props.match.params.expt;
    const participant = this.props.expt.participantID;
    return (
      <div className="container">
      Experiment name: <br/>
      <b>{exptName}</b>
      <br/>
      Participant ID: <br/>
      <b>{participant}</b>
      <br/><br/>
      {this.displayExpt()}
    </div>
    )
  }
}

Experiment.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  participantID: PropTypes.string.isRequired,
  sendExpt: PropTypes.func.isRequired,
  setNumQ: PropTypes.func.isRequired,
  isFinalQ: PropTypes.func.isRequired,
  storeAnswer: PropTypes.func.isRequired,
  getItemData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  expt: state.expt,
  participantID: state.participantID
})

export default connect(
  mapStateToProps,
  { getExpt, sendExpt, setNumQ, isFinalQ, storeAnswer, getItemData }
)(Experiment);
