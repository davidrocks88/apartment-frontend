import { configureStore } from '@reduxjs/toolkit'
import apartmentsReducer from './slices/apartments';
import communitiesReducer from './slices/communities';

const reducers = {
  apartments: apartmentsReducer,
  communities: communitiesReducer
}

export const store = configureStore({ reducer: reducers })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on