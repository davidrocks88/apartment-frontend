import {
  FETCH_COMMUNITIES_BEGIN,
  FETCH_COMMUNITIES_END,
  SELECT_COMMUNITY,
  FETCH_APARTMENTS_BEGIN,
  FETCH_APARTMENTS_END,
  SELECT_APARTMENT_UNIT,
  SHOW_APARTMENT_UNIT_DATA,
  HIDE_APARTMENT_UNIT_DATA
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

export function selectApartment(apartment) {
    return {
        type: SELECT_APARTMENT_UNIT,
        apartment
    }
}

export function showApartmentData() {
  return {
    type: SHOW_APARTMENT_UNIT_DATA,
  };
}

export function hideApartmentData() {
  return {
    type: HIDE_APARTMENT_UNIT_DATA,
  };
}
