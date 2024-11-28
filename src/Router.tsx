import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainForGuest from "./pages/MainGuest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MainForGuest />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/movies/:movieId",
        element: <Home />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/tv/:tvId",
        element: <Tv />,
      },
      {
        path: "/home/search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
