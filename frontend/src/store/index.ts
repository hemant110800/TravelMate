import {configureStore} from '@reduxjs/toolkit'
import { cartSlice } from './cartSlice';
import {notificationSlice} from './uiSlice';

// console.log(cartSlice);
export const storeItems = configureStore(
{
    reducer:{StoredCart:cartSlice.reducer,NotifyUser:notificationSlice.reducer}
})

export type AppDispatch = typeof storeItems.dispatch //dispacth type
export type RootState = ReturnType<typeof storeItems.getState>; //useSelector type


// Reducer functions should be pure, side effect free and  synchronous functions, no asynchronous code is allowed 
// Input Old State+Action => Output New State.

/*if we need to use fetch method or any asynchronous operation inside reduer func, how to
 handle in redux

Inside action creators(Thunk).

Thunks:- A function that delays an action until later.
"-- An action creator function that does not return the action itslef but instead another function which
eventually returns the actions --"

cartactions.js -- custom action creator created
*/