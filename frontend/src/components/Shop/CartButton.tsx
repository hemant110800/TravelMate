import { useDispatch, useSelector } from 'react-redux';
import { notifyActions } from '../../store/uiSlice';
import type { AppDispatch, RootState } from '../../store';
import cart_icon from '../../assets/cart-icon.svg';

interface CartButtonProps {
  // if you expect any props, define them here
}

const CartButton = (props:CartButtonProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const cartItemsCount = useSelector((state:RootState)=>state.StoredCart.totalItems);


  const toggleState = ()=>{
    console.log("cart button");
    dispatch(notifyActions.toggleCartArea());
  }

  return (
    <button className="button cartBtn" onClick={toggleState}>
      {/* <span>My Cart</span> */}
      <img src={cart_icon}></img>
      <span className="badge">{cartItemsCount}</span>
    </button>
  );
};

export default CartButton;
