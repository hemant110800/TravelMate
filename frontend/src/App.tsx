import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlacePicker from "./components/Places/PlacePicker";
import Shopping from "./components/Shop/Shopping";
import RouterWrapper from "./components/UI/RouterWrapper";
import Login from "./components/UI/Login";
import Register from "./components/UI/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/UI/ProtectedRoutes";
// import RouterWrapper from "./components/RouterWrapper";

const def_route = createBrowserRouter([
  {
    path: "/",
    element: <RouterWrapper />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <PlacePicker />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shopping",
        element: (
          <ProtectedRoute>
            <Shopping />
          </ProtectedRoute>
        ),
      },

      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={def_route}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
