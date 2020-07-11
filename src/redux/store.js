import { configureStore } from '@reduxjs/toolkit'

import fetchCommunities from './reducers/communitiesFetch'
import selectCommunity from './reducers/selectCommunity';
import apartmentsReducer from './slices/apartments';

const reducers = {
  fetchCommunities, selectCommunity,
  apartments: apartmentsReducer
}

export const store = configureStore({ reducer: reducers })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on