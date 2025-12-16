import { createContext, useEffect, useState, type ReactNode } from "react";
import {
  getToken,
  registerUser,
} from "../utils/http_methods";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

interface DecodedToken {
  username: string;
  user_id: number;
  // exp: number;
  // iat: number;
}

// Request body for login
interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

type AuthTokens = {
  access: string;
  refresh: string;
};

interface AuthContextType {
  user: string | null;
  userID: number | null;
  authToken: AuthTokens | null;
  loginHandler: (userData: LoginRequest) => Promise<any>;
  logoutHandler: () => void;
  registerHandler: (userData: RegisterRequest) => Promise<any>;
}

interface AuthProvideProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);
export default AuthContext;

//outside Provider
export let updateAuthTokensExternal: ((tokens: AuthTokens) => void) | null = null;

export const AuthProvider = ({ children }: AuthProvideProps) => {
  console.log(localStorage.getItem("authToken"));


  const storedToken = localStorage.getItem("authToken");
  const initialTokens: AuthTokens | null = storedToken
    ? JSON.parse(storedToken)
    : null;

  const [authToken, setAuthToken] = useState<AuthTokens | null>(initialTokens);
  
  const [user, setUser] = useState<string | null>(() =>
    storedToken
      ? jwtDecode<DecodedToken>(JSON.parse(storedToken).access).username
      : null
  );

  const [userID, setUserID] = useState<number | null>(() =>
    storedToken
      ? jwtDecode<DecodedToken>(JSON.parse(storedToken).access).user_id
      : null
  );

  // --------------------
  // Login Handler
  // --------------------

  const loginHandler = async (userData: LoginRequest) => {
    try {
      const resp = await getToken(userData);
      if (resp.status === 200) {
        // console.log(resp, resp.data.access);
        const tokens: AuthTokens = resp.data;
        console.log(tokens);
        setAuthToken(tokens);

        const decoded = jwtDecode<DecodedToken>(tokens.access);
        console.log(decoded);

        setUser(decoded.username);
        setUserID(decoded.user_id);

        localStorage.setItem("authToken", JSON.stringify(tokens));
      }
      return resp;
    } catch (error: any) {
      if (error.response) {
        // The request was made and server responded with a status code not in 2xx
        console.error("Backend error:", error.response.data); // 👈 this has your backend's message

        var err_msg = error.response.data.detail || "Something went wrong.";
        // alert(err_msg);
        return err_msg;
      } else if (error.request) {
        // The request was made but no response
        console.error("No response:", error.request);
      } else {
        // Something else happened
        console.error("Axios error:", error.message);
      }
    }
  };

  // --------------------
  // Register Handler
  // --------------------

  const registerHandler = async (userData: RegisterRequest) => {
    try {
      const resp = await registerUser(userData);
      if (resp.status === 201) {
        console.log(resp, resp.data.token);

        const token: AuthTokens = resp.data.token;
        setAuthToken(token);

        const decoded = jwtDecode<DecodedToken>(token.access);
        setUserID(decoded.user_id);

        console.log(resp.data.username);
        setUser(resp.data.username);

        localStorage.setItem("authToken", JSON.stringify(token));
      }
      return resp;
    } catch (error: any) {
      if (error.response) {
        // The request was made and server responded with a status code not in 2xx
        console.error("Backend error:", error.response.data); // 👈 this has your backend's message

        var err_msg =
          error.response.data.error ||
          error.response.data.username ||
          "Something went wrong.";
        // alert(err_msg);
        return err_msg;
      } else if (error.request) {
        // The request was made but no response
        console.error("No response:", error.request);
      } else {
        // Something else happened
        console.error("Axios error:", error.message);
      }
    }
  };

  // --------------------
  // Refresh Token now handling in axios interceptors
  // --------------------

  const updateAuthTokens = (tokens: AuthTokens) => {
    setAuthToken(tokens);
    const decoded = jwtDecode<DecodedToken>(tokens.access);
    setUser(decoded.username);
    setUserID(decoded.user_id);
    localStorage.setItem("authToken", JSON.stringify(tokens));
  };
  
  // const updateToken = async (refreshToken: { refresh: string }) => {
  //   try {
  //     console.log("Updating the Token!");
  //     const resp = await update_access_token(refreshToken);

  //     if (resp.status === 200) {
  //       const tokens: AuthTokens = {
  //         access: resp.data.access,
  //         refresh: authToken?.refresh || refreshToken.refresh,
  //       };

  //       setAuthToken(tokens);

  //       const decoded = jwtDecode<DecodedToken>(tokens.access);
  //       setUser(decoded.username);
  //       setUserID(decoded.user_id);

  //       localStorage.setItem("authToken", JSON.stringify(tokens));

  //       if (loading) {
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error: any) {
  //     logoutUser();

  //     if (error.response) {
  //       // The request was made and server responded with a status code not in 2xx
  //       console.error("Backend error:", error.response.data); // 👈 this has your backend's message

  //       var err_msg = error.response.data.detail || "Something went wrong.";
  //       // alert(err_msg);
  //     } else if (error.request) {
  //       // The request was made but no response
  //       console.error("No response:", error.request);
  //     } else {
  //       // Something else happened
  //       console.error("Axios error:", error.message);
  //     }
  //   }
  // };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    setUserID(null);
    localStorage.removeItem("authToken");
    redirect("/login");
  };

  
  // after defining updateAuthTokens inside AuthProvider:
  useEffect(() => {
    updateAuthTokensExternal = updateAuthTokens; // 👈 make it available outside React
  }, []);
  
  // after evry 3-4 minute trying to refresh tokens
  // useEffect(() => {
  //   let fourMinutes = 3 * 60 * 1000;

  //   if (loading && authToken) {
  //     updateToken({ refresh: authToken.refresh });
  //   }

  //   let interval = setInterval(() => {
  //     if (authToken) {
  //       console.log(authToken, authToken.refresh);
  //       updateToken({ refresh: authToken.refresh });
  //     }
  //   }, fourMinutes);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [authToken, loading]);

  let contextData = {
    user: user,
    userID: userID,
    authToken: authToken,
    loginHandler: loginHandler,
    logoutHandler: logoutUser,
    registerHandler: registerHandler,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
