import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


interface Protectedprops{
  children:React.ReactNode
}

function ProtectedRoute({children}:Protectedprops) {

  const auth = useContext(AuthContext);

  if (!auth) {
    // context not ready yet
    return <Navigate to="/login" replace />;
  }

  const isAuth = auth.user !== null;
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;

}

export default ProtectedRoute;
