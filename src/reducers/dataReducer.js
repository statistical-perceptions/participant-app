import {
  GET_EXPT,
  PART_ID,
  Q_KEYS,
  FINAL_Q,
  ANSWER
} from "../actions/types";
import { act } from "react-dom/test-utils";
import { bindActionCreators } from "redux";

const initialState = {
  exptToDisplay: {},
  participantID: '',
  questionKeys: [],
  isFinalQ: false,
  answer: []
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

