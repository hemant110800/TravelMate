import axios, { type AxiosResponse } from "axios";
import api from "./axios_interceptor";

type PlaceType = {
  id: string;
  title: string;
  image_src: string;
  image_alt: string;
  lat: number;
  lon: number;
};

interface retrievePlaceType {
  place: PlaceType;
  id: number;
  user: number;
  created_at: string;
}

type UpdatePlacesResponse = {
  message: string;
};

// Request body for login
interface LoginRequest {
  username: string;
  password: string;
}

// Response from /token/ (JWT auth)
interface TokenResponse {
  access: string;
  refresh: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// Response from /user/register/
interface RegisterResponse {
  username: string;
  response: string;
  email: string;
  token: TokenResponse; // assuming backend returns token
}

interface ShoppingProducts {
  id: string;
  title: string;
  description: string;
  price: number;
  image_src: string;
  image_alt: string;
}

interface RefreshRequest {
  refresh: string;
}

// Response from /token/refresh/
interface RefreshResponse {
  access: string;
}

interface razorPayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function getToken(
  data: LoginRequest
): Promise<AxiosResponse<TokenResponse>> {
  const resp = await api.post<TokenResponse>("/auth/token/", data, {
    withCredentials: true,
  });

  return resp;
}

export async function registerUser(
  data: RegisterRequest
): Promise<AxiosResponse<RegisterResponse>> {
  const resp = await api.post<RegisterResponse>("/user/register/", data, {
    withCredentials: true,
  });

  return resp;
}

export async function update_access_token(
  data: RefreshRequest
): Promise<AxiosResponse<RefreshResponse>> {
  const resp = await api.post<RefreshResponse>("/auth/token/refresh/", data, {
    withCredentials: true,
  });

  return resp;
}

export async function retrieve_AvailablePlaces(): Promise<PlaceType[]> {
  const response = await api.get<PlaceType[]>("/place-picker/places/");
  // const respDict = await response.json();
  if (response.status !== 200) {
    throw new Error("Failed to fetch available places!!");
  }
  console.log(response.data);
  return response.data;
}

export async function add_UserPlace(place_id: string) {
  console.log("🔥 API call fired to add User Places");

  const response = await api.post<UpdatePlacesResponse>(
    "/place-picker/user-places/",
    { place_id: place_id },
    { headers: { "Content-Type": "application/json" } }
  );

  // const respDict = await response.json();
  if (response.status !== 201) {
    throw new Error("Places not updated!!!");
  }

  console.log(response);
  return response.data.message;
}

export async function delete_UserPlaces(place_id: string) {
  const response = await api.delete<{ message: string }>(
    "/place-picker/user-places/",
    {
      data: { place_id: place_id },
      headers: { "Content-Type": "application/json" },
    }
  );

  // const respDict = await response.json();
  if (response.status !== 204 && response.status !== 200) {
    throw new Error("Failed to delete selected place!!!");
  }

  console.log(response);
  return response.data?.message || "Deleted Successfully";
}

export async function retrieve_UserPlaces(): Promise<PlaceType[]> {
  console.log("🔥 API call fired: retrieve_UserPlaces");
  const response = await api.get<retrievePlaceType[]>(
    "/place-picker/user-places/"
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch user selected place!!");
  }

  const places: PlaceType[] = response.data.map((up) => up.place);

  console.log(places);

  return places;
}

export async function retrieve_shopping_products(): Promise<
  ShoppingProducts[]
> {
  console.log("🔥 API call fired: shopping_produts");
  const response = await api.get<ShoppingProducts[]>("/shop/products/");

  if (response.status !== 200) {
    throw new Error("Failed to fetch products list!!");
  }

  // const places:PlaceType[] = response.data.map(up => up.place);

  console.log(response.data);

  return response.data;
}

export async function verifyPaymentHandler(
  razorPayResponse: razorPayPaymentResponse
) {
  const response = await axios.post(
    "http://127.0.0.1:8000/shop/verify_payment/",
    razorPayResponse
  );
  if (response.status !== 200) {
    throw new Error("Invalid Signature!!");
  }
  console.log(response.data);
  return response.data;
}

export async function makePayment(amount: number): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const orderResponse = await axios.post(
      "http://127.0.0.1:8000/shop/create-order/",
      { amount }
    );

    const { order_id, key, amount: orderAmount } = orderResponse.data;

    const options = {
      key: key,
      amount: orderAmount,
      currency: "INR",
      name: "TravelShop",
      description: "Order Payment",
      order_id: order_id,

      handler: async function (response: any) {
        try {
          // Razorpay’s handler runs asynchronously after window opens, not as a return value.
          console.log("Payment Success:", response);
          // alert("Payment Successful!");
          var respObj = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const resp = await verifyPaymentHandler(respObj);
          console.log(resp);
          resolve(resp); //Return to caller
        } catch (err) {
          reject(err);
        }
      },

      modal: {
        ondismiss: function () {
          reject(new Error("Payment cancelled by user"));
        },
      },

      prefill: {
        name: "Custmer",
        email: "customer@gmail.com",
        contact: "9999999999",
      },

      theme: { color: "#3399cc" },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
  });
}

export const geminiChat = async (message: string) => {
  const res = await axios.post("http://127.0.0.1:8000/ai/gemini-chat/", {
    message,
  });
  if(res.status == 400){
    throw new Error("Something went wrong!")
  }
  return res.data.reply;
};