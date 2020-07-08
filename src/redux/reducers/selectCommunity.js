import { SELECT_COMMUNITY } from "../actionTypes";

export default function selectCommunity(state, action) {
  switch (action.type) {
    case SELECT_COMMUNITY:
      return action.id;
    default:
      return 0;
  }
}
