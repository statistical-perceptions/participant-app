import {
  GET_EXPT,
  PART_ID
} from "../actions/types";

const initialState = {
  exptToDisplay: {},
  participantID: ''
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
    default:
      return state;
  }
}

