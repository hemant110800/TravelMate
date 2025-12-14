import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
// import { saveCartDetails, fetchCartDetails } from "./store/cartactions";
import { type AppDispatch, type RootState } from "../../store";
import Notification from "../UI/Notification";
import Cart from "./Cart";
import Products from "./Products";
import { fetchCartDetails, saveCartDetails } from "../../store/cartactions";

let initialValue = true; // we want to avoid first time service call, this variable define once ,
// independent of component re-renders.

//For service call we can maintain loadstate, errorState with useState but here we
// will maintain redux state only in uiSlice as notification

function Shopping() {
  const cartshowState = useSelector(
    (state: RootState) => state.NotifyUser.showCartItems
  );
  const notification_state = useSelector(
    (state: RootState) => state.NotifyUser
  );
  const cartDetails = useSelector((state: RootState) => state.StoredCart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [dispatch]); //only execute for first time

  useEffect(() => {
    if (initialValue) {
      //this blocks only for first time when application started
      initialValue = false;
      return;
    }

    //with dispatch only func will run because in redux it will dispatch actions

    if (cartDetails.changeCart) {
      // avoid saving of cart for first time when fetching and redux state updation happening
      dispatch(saveCartDetails(cartDetails));
    }
  }, [cartDetails, dispatch]);

  // console.log(cartshowState);
  return (
    <Fragment>
        {notification_state.status !== "" && (
          <Notification
            status={notification_state.status}
            title={notification_state.title}
            message={notification_state.message}
          />
        )}
        {cartshowState && <Cart />}
        <Products />
    </Fragment>
  );
}

export default Shopping;
