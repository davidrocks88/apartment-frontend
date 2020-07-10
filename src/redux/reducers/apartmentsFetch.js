import { FETCH_APARTMENTS_BEGIN, FETCH_APARTMENTS_END } from "../actionTypes";

const defaultState = {
    status: "NONE",
};

export default function apartments(state = defaultState, action) {
  switch (action.type) {
    case FETCH_APARTMENTS_BEGIN:
      return {
          ...state,
          status: "WAITING",
      }
    case FETCH_APARTMENTS_END:
        return {
            ...state,
            status: action.payload.success ? "SUCCESS" : "FAILURE",
            [action.payload.apartments[0].community_id]: action.payload.apartments
        }
    default:
      return state;
  }
}
