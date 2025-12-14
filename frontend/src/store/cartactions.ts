import { notifyActions } from "./uiSlice";
import { cartActions } from "./cartSlice";
import api from "../utils/axios_interceptor";
import { type AppDispatch } from "./index";

// Define cart type based on your slice
interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
  image_src:string;
  image_alt:string;
}

interface CartState {
  cartValues: CartItem[];
  totalItems: number;
}

/*For handling asynchrnous code in redux ->  custom action creator which 
    returns a function which eventually dispatch an action. */
export const saveCartDetails = (cart: CartState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      notifyActions.showNotifications({
        status: "pending",
        title: "Pending",
        message: "Data Sending!!",
      })
    );

    try {
      const response = await api.post("/shop/cart/", {
        cart: {
          cartValues: cart.cartValues,
          totalItems: cart.totalItems,
        },
      });

      console.log(response.data);

      dispatch(
        notifyActions.showNotifications({
          status: "success",
          title: "Success",
          message: "Data Successfully Saved!!",
        })
      );

      setTimeout(() => {
        dispatch(notifyActions.hideNotification());
      }, 2000);
    } catch (err: any) {
      dispatch(
        notifyActions.showNotifications({
          status: "error",
          title: "An error occurred",
          message: err.message || "Data save failed",
        })
      );

      setTimeout(() => {
        dispatch(notifyActions.hideNotification());
      }, 4000);
    }
  };
};

export const fetchCartDetails = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      notifyActions.showNotifications({
        status: "pending",
        title: "Pending",
        message: "Data Retrieval Pending!!",
      })
    );

    try {
      const response = await api.get("/shop/cart/");
      const storedCartValues = response.data;

      console.log(storedCartValues);

      dispatch(cartActions.replaceCart(storedCartValues));

      dispatch(
        notifyActions.showNotifications({
          status: "success",
          title: "Success",
          message: "Data Successfully Retrieved!!",
        })
      );

      setTimeout(() => {
        dispatch(notifyActions.hideNotification());
      }, 2000);
    } catch (err: any) {
      dispatch(
        notifyActions.showNotifications({
          status: "error",
          title: "An error occurred",
          message: err.message || "Data retrieval failed",
        })
      );

      setTimeout(() => {
        dispatch(notifyActions.hideNotification());
      }, 4000);
    }
  };
};
