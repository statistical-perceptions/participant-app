import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getExpt
} from "../actions/dataActions";

class StaticText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    // ###TODO###: change the name of the following binding if you see fit
    // this binds the state to the showItem function below
    this.showItem = this.showItem.bind(this);
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

  // ###TODO###: add your own function(s) to show experiment item(s)
  showItem() {
    return (
      <div className="container">
        {this.props.text}
      </div>
    )
  }

  // please render anything else you see fit
  render() {
    return (
      <div className="container">
        {this.showItem()} <br/>
      </div>
    )
  }

}

// Listing required functions / data
StaticText.propTypes = {
  getExpt: PropTypes.func.isRequired,
  expt: PropTypes.object.isRequired
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
  { getExpt }
)(StaticText);