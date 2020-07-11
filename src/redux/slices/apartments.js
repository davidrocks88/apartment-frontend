import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: "NONE",
  showModal: false,
  apartments: {},
  selectedApartment: null,
  roomFilter: -1
};

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    fetchApartmentsBegin(state) {
      state.status = "WAITING";
    },
    fetchApartmentsEnd(state, {payload}) {
      const {success, apartments} = payload;
      state.status = success ? "SUCCESS" : "FAILURE";
      state.apartments[apartments[0].community_id] = apartments;
    },
    selectApartment(state, action) {
      state.selectedApartment = action.payload;
    },
    showApartmentUnitModal(state) {
      state.showModal = true;
    },
    hideApartmentUnitModal(state) {
      state.showModal = false;
    },
    filterRooms(state, action) {
      state.roomFilter = action.payload;
    }
  }
})

export const {
  fetchApartmentsBegin,
  fetchApartmentsEnd,
  selectApartment,
  showApartmentUnitModal,
  hideApartmentUnitModal,
  filterRooms
} = apartmentsSlice.actions;

export default apartmentsSlice.reducer;