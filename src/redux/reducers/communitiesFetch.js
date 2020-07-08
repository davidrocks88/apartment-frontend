import { FETCH_COMMUNITIES_BEGIN, FETCH_COMMUNITIES_END } from "../actionTypes";

const defaultState = {
    status: "NONE",
    communities: []
};

export default function fetchCommunities(state = defaultState, action) {
  switch (action.type) {
    case FETCH_COMMUNITIES_BEGIN:
      return {
          ...state,
          status: "WAITING",
      }
    case FETCH_COMMUNITIES_END:
        return {
            ...state,
            status: action.payload.success ? "SUCCESS" : "FAILURE",
            communities: action.payload.communities
        }
    default:
      return state;
  }
}
