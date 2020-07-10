import {
  FETCH_COMMUNITIES_BEGIN,
  FETCH_COMMUNITIES_END,
  SELECT_COMMUNITY,
  FETCH_APARTMENTS_BEGIN,
  FETCH_APARTMENTS_END,
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
    id,
  };
}

export function fetchApartmentsBegin() {
  return {
    type: FETCH_APARTMENTS_BEGIN,
  };
}

export function fetchApartmentsEnd(success, apartments = []) {
  return {
    type: FETCH_APARTMENTS_END,
    payload: {
      success,
      apartments,
    },
  };
}
