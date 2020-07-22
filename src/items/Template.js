import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Item.css"

import {
  getExpt,
  storeAnswer
} from "../actions/dataActions";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.resetState = this.resetState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    // ###TODO###: change the name of the following binding if you see fit
    // this binds the state to the showItem function below
    this.showItem = this.showItem.bind(this);
  }

  // setting the initial state of this component 
  get initialState() {
    return {
      // this submitted variable is required 
      submitted: false,
      // ###TODO###: add more variables below 
    };
  }

  // reset state to initial state 
  // this will be called when Experiment.js spins up another instance 
  // of this component 
  resetState() {
    this.setState(this.initialState);
  }

  // additional setup to communicate with Experiment.js
  componentDidMount() {
    const { childRef } = this.props;
    childRef(this);
    this.getData();
  }

  // additional setup to communicate with Experiment.js
  componentWillUnmount() {
    const { childRef } = this.props;
    childRef(undefined);
  }

  // get experiment data from the database 
  getData() {
    const db = this.props.expt.dbInfo.db;
    const studyName = this.props.expt.dbInfo.col.split("-")[0];
    const exptName = this.props.expt.dbInfo.col.split("-")[1];
    this.props.getExpt(db, studyName, exptName);
  }

  // handles change in user input 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // trigger this action to save user answer in the Redux store 
  // all answers in store will be sent to the database later 
  onSubmit() {
    const question = this.props.question;
    this.props.storeAnswer(question, this.state.value);
    this.setState({ submitted: true });
  }

  // ###TODO###: add your own function(s) to show experiment item(s)
  showItem() {
    return (
      <div className="container">
        <input type="text"/>
      </div>
    )
  }

  // please render anything else you see fit
  render() {
    return (
      <div className="container">
        {this.showItem()} <br/>
        {
          !this.state.submitted && 
          <div>
            <input type="submit" className="btn" value="Ok"
              onClick={this.onSubmit}/> <br/>
            <p style={{ color: "grey" }}>
              Reminder: Once you click "Ok", your response to this question will be 
              recorded, and you won't be able to change your answer. 
            </p>
          </div>
        }
      </div>
    )
  }

}

// Listing required functions / data
Template.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired,
  storeAnswer: PropTypes.func.isRequired
}

// mapping Redux state to props that we can use in our component
// expt contains all info from a given experiment 
const mapStateToProps = state => ({
  expt: state.expt
})

// connecting props to our component
// export our component so that Experiment.js can use it 
export default connect(
  mapStateToProps,
  { getExpt, storeAnswer }
)(Template);