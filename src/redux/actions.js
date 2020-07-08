import {
  FETCH_COMMUNITIES_BEGIN,
  FETCH_COMMUNITIES_END,
  SELECT_COMMUNITY,
} from "./actionTypes";

export function fetchCommunitiesBegin() {
  return {
    type: FETCH_COMMUNITIES_BEGIN,
  };
}

export function fetchCommunitiesEnd(success, communities = []) {
  return {
    type: FETCH_COMMUNITIES_END,
    payload: {
      success,
      communities,
    },
  };
}

export function selectCommunity(id) {
  return {
    type: SELECT_COMMUNITY,
    id
  };
}
