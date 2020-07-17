import axios from "axios";
import {
  GET_EXPT,
  PART_ID,
  SEND_EXPT
} from "./types"

export const getExpt = (which_db, study_name, expt_name) => dispatch => {
  const API_URL = 'https://test-api-615.herokuapp.com/api/feedback/' +
    which_db + '/info/' + 'studyName-' + study_name;
  axios
    .get(API_URL)
    .then(res => {
      const experiments = res.data.experiments;
      var thisExpt = {};
      experiments.forEach(element => {
        if (element.exptName == expt_name) {
          thisExpt = element;
        }
      });
      dispatch({
        type: GET_EXPT,
        payload: thisExpt
      })
      console.log("dispatched");
    })
}

export const storePartID = (part_id) => dispatch => {
  dispatch({
    type: PART_ID,
    payload: part_id
  })
}

export const sendExpt = (which_db, which_col, dataToPOST) => dispatch => {
  const API_URL = 'https://test-api-615.herokuapp.com/api/feedback/' +
    which_db + "/" + which_col;
  axios
    .post(API_URL, dataToPOST)
    .then(res => {
      console.log(res);
    })
}