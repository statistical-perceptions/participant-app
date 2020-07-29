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

// Input: name of a database, name of a collection 
// Output: a JSON object containing the input
// Action: puts database - collection information into redux store so that 
//         it's easily accessible for all components
export const storeDBInfo = (which_database, which_collection) => dispatch => {
  dispatch({
    type: DB_INFO,
    payload: {
      db: which_database,
      col: which_collection
    }
  })
}

// Input: name of a database, name of a study, name of an experiment
// Output: a JSON object containing configuration data of the given experiment 
//         in the given study 
// Action: a GET request to get the output. 
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

// Input: participant ID
// Output: participant ID
// Action: puts participant ID into redux store so that it's easily accessible 
//         for all components 
export const storePartID = (part_id) => dispatch => {
  dispatch({
    type: PART_ID,
    payload: part_id
  })
}

// Input: name of a database, name of a collection, JSON object containing 
//        user responses
// Output: NONE
// Action: a POST request to send user response to the appropriate collection 
//         in Mongo database. 
export const sendExpt = (which_db, which_col, dataToPOST) => dispatch => {
  const API_URL = 'https://test-api-615.herokuapp.com/api/feedback/' +
    which_db + "/" + which_col;
  axios
    .post(API_URL, dataToPOST)
    .then(res => {
      // console.log(res);
    })
}

// Input: an array representing questions keys of an experiment
// Output: the same array
// Action: puts the array into redux store so that it's easily accessible for 
//         all components
export const storeQKeys = (keys) => dispatch => {
  dispatch({
    type: Q_KEYS,
    payload: keys
  })
}

// Input: a number representing the index of the questions keys array. 
//        This number tells Experiment.js what to display next
// Output: the same number
// Action: puts the number into redux store so that it's easily accessible 
//         for all components
export const setNumQ = (num) => dispatch => {
  dispatch({
    type: NUM_Q,
    payload: num
  })
}

// Input: a boolean indicating whether the next question to display is the 
//        last question. This boolean determines which type of <button> to show
// Output: the same boolean
// Action: puts the boolean into redux store so that it's easily accessible 
//         for all components
export const isFinalQ = (is) => dispatch => {
  dispatch({
    type: FINAL_Q,
    payload: is
  })
}

// Input: a string representing a question, any representing an answer
// Output: a JSON object containing the inputs
// Action: puts the object into redux store. Notice the redux reducer 
//         appends the answer to the existing state. In this way, ```Success.js``` can send all stored answers via API at the end of the experiment. 
export const storeAnswer = (question, answer) => dispatch => {
  dispatch({
    type: ANSWER,
    payload: {
      que: question,
      ans: answer
    }
  })
}

// ###DEPRECATED###
// Reason: there's a lag in receiving the output, which causes errors when 
//         displaying experiment items. 
// Input: name of a database, name of an uploaded file whose content is a 
//        JSON object containing experiment item data
// Output: the content of the file
// Action: puts the output into redux store so that it's easily accessible 
//         for all components.
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