import {
  FETCH_APARTMENTS_BEGIN,
  FETCH_APARTMENTS_END,
  SHOW_APARTMENT_UNIT_DATA,
  HIDE_APARTMENT_UNIT_DATA,
  SELECT_APARTMENT_UNIT,
} from "../actionTypes";

const defaultState = {
  status: "NONE",
  showModal: false,
};

export default function apartments(state = defaultState, action) {
  switch (action.type) {
    case FETCH_APARTMENTS_BEGIN:
      return {
        ...state,
        status: "WAITING",
      };
    case FETCH_APARTMENTS_END:
      return {
        ...state,
        status: action.payload.success ? "SUCCESS" : "FAILURE",
        apartments: {
          [action.payload.apartments[0].community_id]: action.payload.apartments,
        }
      };
    case SHOW_APARTMENT_UNIT_DATA:
      return {
        ...state,
        showModal: true,
      };
    case HIDE_APARTMENT_UNIT_DATA:
      return {
        ...state,
        showModal: false,
      };
    case SELECT_APARTMENT_UNIT:
      return {
        ...state,
        selectedApartment: action.apartment
      };
    default:
      return state;
  }
}
