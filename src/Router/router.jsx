// router.js
import { createBrowserRouter } from "react-router-dom";

import Login from "../Components/Login";
import App from "../App";
import Register from "../Components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;