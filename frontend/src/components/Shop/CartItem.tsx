import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import type { AppDispatch } from "../../store";

type CartContain = {
  id: string;
  title: string;
  quantity: number;
  total: number;
  price: number;
  image_src: string;
  image_alt: string;
};

interface CartItemProps {
  item: CartContain;
}

const CartItem = (props: CartItemProps) => {
  console.log(props.item);
  const { id, title, quantity, total, price, image_src, image_alt } =
    props.item;

  const dispatch = useDispatch<AppDispatch>();

  const IncrementItems = () => {
    dispatch(cartActions.addItem({ id, title, price, image_src, image_alt }));
  };
  const DecrementItems = () => {
    dispatch(cartActions.removeItem({ id }));
  };
  return (
    <li className="item">
      <header className="d-flex gap-4">
        <img
          className="cart_pr_image"
          // src={`http://127.0.0.1:8000/prod_images/${image_src}`}
          src={`/public/shop/${image_src}`}
          alt={image_alt}
        />
        <div className="d-flex flex-column gap-2 justify-content-start align-items-start">
          <h4>{title}</h4>
          <div className="price d-flex gap-2 align-items-center">
            &#8377;{total.toFixed(2)}
            <span className="itemprice">
              (&#8377;{price.toFixed(2)}/item{" "}
              <span className="quantity">
                x <span>{quantity}</span>
              </span>
              )
            </span>
          </div>
          <div className="details">
            <div className="actions">
              <button onClick={DecrementItems} title="Remove">
                -
              </button>
              <button onClick={IncrementItems} title="Add">
                +
              </button>
            </div>
          </div>
        </div>
      </header>
    </li>
  );
};

export default CartItem;
