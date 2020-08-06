import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PreviewSuccess extends Component {
  componentDidMount() {
    // console.log(this.props);
    const username = this.props.expt.dbInfo.db;
    const expt = this.props.expt.dbInfo.col;
    if (!this.props.expt.answer.length == 0) {
      const finalObj = {
        participantID: this.props.expt.participantID
      }
      this.props.expt.answer.map(entry => {
        finalObj[entry.que] = entry.ans
      })
      console.log(finalObj);
    }
  }

  render() {
    const link = this.props.expt.exptToDisplay.link;
    return (
      <div className="container">
        <h1>Thank you for your submission!</h1> <br/>
        Please click on this <a href={link} target="_blank">link</a> to complete the final survey. 
      </div>
    )
  }
}

PreviewSuccess.propTypes = {
  expt: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  expt: state.expt,
})

export default connect(
  mapStateToProps,
  { }
)(PreviewSuccess);
