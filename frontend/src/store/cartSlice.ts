import { createSlice, type PayloadAction,} from "@reduxjs/toolkit";

// Define the shape of a cart item
interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    total: number;
    image_src:string;
    image_alt:string;
}
  
  // Define the state shape
interface CartState {
    cartValues: CartItem[];
    totalItems: number;
    changeCart: boolean;
}

const initialState: CartState = {
    cartValues: [],
    totalItems: 0,
    changeCart: false,
};  

export const cartSlice = createSlice({
 name: "HandleCart",
 initialState,
 reducers: {
     replaceCart(state, action:PayloadAction<CartState>) {
         console.log("Replacement");
         state.cartValues = action.payload.cartValues;
         state.totalItems = action.payload.totalItems;
         state.changeCart = action.payload.changeCart ?? false;
         console.log(action.payload);
     },
     addItem(state, action:PayloadAction<{id:string,title:string, price:number, image_src:string, image_alt:string}>) {
         console.log("Adding Items in Cart");
         state.totalItems++;
         state.changeCart=true;
         let selItem = state.cartValues.find((item) => item.id === action.payload.id);
        //  console.log(selItem);
         if (!selItem) {
             state.cartValues.push({
                 id: action.payload.id,
                 title: action.payload.title,
                 price: action.payload.price,
                 quantity: 1,
                 total: action.payload.price,
                 image_src: action.payload.image_src,
                 image_alt: action.payload.image_alt,
             })
         }
         else {
             selItem.quantity = selItem.quantity + 1;
             selItem.total = selItem.total + action.payload.price;
         }

     },
     removeItem(state, action:PayloadAction<{id:string}>) {
         state.totalItems--;
         state.changeCart=true;

         let selectedItem = state.cartValues.find((item) => item.id === action.payload.id);
         if(selectedItem){
             if (selectedItem.quantity > 1) {
             selectedItem.quantity -= 1;
             selectedItem.total -= selectedItem.price;
            }
             else {
                 state.cartValues = state.cartValues.filter((item) => item.id !== action.payload.id);
             }
         }
     }
 }
})


export const cartActions = cartSlice.actions;
