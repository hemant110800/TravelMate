import Card from "../UI/Card";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { makePayment } from "../../utils/http_methods";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { notifyActions } from "../../store/uiSlice";

const Cart = () => {
  var totalPrice = 0;

  const dispatch = useDispatch<AppDispatch>();
  

  const CartDetails = useSelector(
    (state: RootState) => state.StoredCart.cartValues
  );
  console.log(CartDetails);
  CartDetails.map((cartItems) => {
    totalPrice = totalPrice + cartItems.total;
  });

  const placeOrderHandler = async () => {
    try {
      const response = await makePayment(totalPrice);

      dispatch(
        notifyActions.showNotifications({
          status: "success",
          title: "Payment Success",
          message: response.message,
        })
      );

      setTimeout(() => {
        dispatch(notifyActions.hideNotification());
      }, 3000);
    } catch (err: any) {
      dispatch(
        notifyActions.showNotifications({
          status: "error",
          title: "Payment Failed",
          message: err?.message || "Payment failed",
        })
      );

      setTimeout(() => {
        dispatch(notifyActions.hideNotification());
      }, 3000);
    }
  };

  return (
    <Card className="cart">
      <h2>Your Shopping Cart</h2>
      <ul className="cartsItemWrapper">
        {CartDetails.map((cartItems) => {
          return (
            <CartItem
              key={cartItems.id}
              item={{
                id: cartItems.id,
                title: cartItems.title,
                quantity: cartItems.quantity,
                total: cartItems.total,
                price: Number(cartItems.price),
                image_src: cartItems.image_src,
                image_alt: cartItems.image_alt,
              }}
            />
          );
        })}
      </ul>
      <div
        className="d-flex justify-content-between align-items-center"
        id="totalCartContainer"
      >
        <div>
          Total: <span className="fw-bold">&#8377;{totalPrice}</span>
        </div>
        <button className="buyNow" onClick={placeOrderHandler}>
          Place Order
        </button>
      </div>
    </Card>
  );
};

export default Cart;
