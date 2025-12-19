import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import { cartActions } from "../../store/cartSlice";
import type { AppDispatch } from "../../store";
import { makePayment } from "../../utils/http_methods";
import { notifyActions } from "../../store/uiSlice";

interface ProductItemProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image_src: string;
  image_alt: string;
}

const ProductItem = (props: ProductItemProps) => {
  const { title, price, description, id, image_src, image_alt } = props;
  const dispatch = useDispatch<AppDispatch>();

  const addToCart = () => {
    //If reducer logic we will kept here, wherever we are adding item eveytime we need to call this function
    // or write this logic again and again so another way is to directly take the stored cart from recux state and
    // update the server

    dispatch(cartActions.addItem({ id, title, price, image_src, image_alt }));
  };

  const buyProductHandler = async () => {
      try {
        const response = await makePayment(price);
    
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
    
      }
      catch (err: any) {
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
    <li className="pr_item">
      <Card>
        <header>
          <img
            className="pr_image"
            // src={`http://127.0.0.1:8000/prod_images/${image_src}`}
            src={`assets/shop/${image_src}`}
            alt={image_alt}
          />
        </header>
        <div>
          <h3>{title}</h3>
          <p className="m-0 pr_desc" title={description}>
            {description}
          </p>
          <div className="pr_price">&#8377;{price.toFixed(2)}</div>
        </div>
        <div className="pr_actions d-flex gap-2 justify-content-betweeen">
          <button className="w-100" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="buyNow w-100" onClick={buyProductHandler}>
            Buy Now
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
