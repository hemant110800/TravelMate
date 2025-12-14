import { useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import CartButton from "../Shop/CartButton";
import ChatButton from "./ChatButton";
// import AuthContext from "../context/AuthContext";

const NavigationBar = () => {
  const auth = useContext(AuthContext);

  const location = useLocation();
  console.log(auth?.user,location);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand font-bold" to="">
            TravelMate
          </NavLink>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {auth?.user == null && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? "bolder" : "",
                      })}
                      aria-current="page"
                      to="/login"
                      onClick={auth?.logoutHandler}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? "bolder" : "",
                      })}
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {auth?.user != null && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? "bolder" : "",
                      })}
                      aria-current="page"
                      to="/"
                    >
                      Place Pikcer
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? "bolder" : "",
                      })}
                      to="/shopping"
                    >
                      Shopping
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? "bolder" : "",
                      })}
                      to="/login"
                      onClick={auth.logoutHandler}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="d-flex gap-4">
          {
             (auth?.user != null && location.pathname == "/shopping") &&
              <CartButton />
          }
          {
            (auth?.user !=null) && (
              <ChatButton  />
            )
          }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
