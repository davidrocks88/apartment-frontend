import { configureStore } from '@reduxjs/toolkit'

import fetchCommunities from './reducers/communitiesFetch'
import selectCommunity from './reducers/selectCommunity';
import apartmentsFetch from './reducers/apartmentsFetch';
const reducers = {
  fetchCommunities, selectCommunity, apartmentsFetch
}

export const store = configureStore({ reducer: reducers })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on