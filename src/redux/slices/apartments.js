import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: "NONE",
  showModal: false,
  apartments: {},
  selectedApartment: null
};

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    fetchApartmentsBegin(state) {
      state.status = "WAITING";
    },
    fetchApartmentsEnd(state, {payload}) {
      const {status, apartments} = payload;
      state.status = status;
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
    }
  }
})

export const {
  fetchApartmentsBegin,
  fetchApartmentsEnd,
  selectApartment,
  showApartmentUnitModal,
  hideApartmentUnitModal
} = apartmentsSlice.actions;

export default apartmentsSlice.reducer;