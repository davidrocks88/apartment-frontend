import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: "NONE",
  communities: {},
  selectedCommunityId: null
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    fetchCommunitiesBegin(state) {
      state.status = "WAITING";
    },
    fetchCommunitiesEnd(state, {payload}) {
      const {success, communities} = payload;
      state.status = success ? "SUCCESS" : "FAILURE";
      for (let community of communities) {
        state.communities[community.id] = community;
      }
    },
    selectCommunity(state, action) {
      state.selectedCommunityId = action.payload;
    },
  }
})

export const {
  fetchCommunitiesBegin,
  fetchCommunitiesEnd,
  selectCommunity,
} = communitiesSlice.actions;

export default communitiesSlice.reducer;