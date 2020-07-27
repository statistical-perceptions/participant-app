import {
  DB_INFO,
  GET_EXPT,
  PART_ID,
  Q_KEYS,
  FINAL_Q,
  ANSWER,
  ITEM_DATA
} from "../actions/types";
import { act } from "react-dom/test-utils";
import { bindActionCreators } from "redux";

const initialState = {
  dbInfo: {},
  exptToDisplay: {},
  participantID: '',
  questionKeys: [],
  isFinalQ: false,
  answer: [],
  fileContent: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DB_INFO:
      return {
        ...state,
        dbInfo: action.payload
      };
    case GET_EXPT:
      return {
        ...state,
        exptToDisplay: action.payload
      };
    case PART_ID:
      return {
        ...state,
        participantID: action.payload
      };
    case Q_KEYS:
      return {
        ...state,
        questionKeys: action.payload
      };
    case FINAL_Q:
      return {
        ...state,
        isFinalQ: action.payload
      };
    case ANSWER:
      return {
        ...state,
        answer: [...state.answer, action.payload]
      };
    case ITEM_DATA:
      return {
        ...state,
        fileContent: action.payload
      }
    default:
      return state;
  }
}

