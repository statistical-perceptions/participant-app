import axios from "axios";
import {
  DB_INFO,
  GET_EXPT,
  PART_ID,
  SEND_EXPT,
  Q_KEYS,
  NUM_Q,
  FINAL_Q,
  ANSWER,
  ITEM_DATA
} from "./types"

export const storeDBInfo = (which_database, which_collection) => dispatch => {
  dispatch({
    type: DB_INFO,
    payload: {
      db: which_database,
      col: which_collection
    }
  })
}

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
      // console.log(res);
    })
}

export const storeQKeys = (keys) => dispatch => {
  dispatch({
    type: Q_KEYS,
    payload: keys
  })
}

export const setNumQ = (num) => dispatch => {
  dispatch({
    type: NUM_Q,
    payload: num
  })
}

export const isFinalQ = (is) => dispatch => {
  dispatch({
    type: FINAL_Q,
    payload: is
  })
}

// entry should be in the format of: { "somequestion": "answer" }
export const storeAnswer = (question, answer) => dispatch => {
  dispatch({
    type: ANSWER,
    payload: {
      que: question,
      ans: answer
    }
  })
}

export const getItemData = (which_database, fileName) => dispatch => {
  const API_URL = 'https://test-api-615.herokuapp.com/api/feedback/' +
    which_database + "/itemData";
  axios
    .get(API_URL)
    .then(res => {
      const fileContent = res.data.filter(doc => doc.fileName == fileName)[0].fileContent
      dispatch({
        type: ITEM_DATA,
        payload: fileContent
      })
    })
}