import Shop from "../components/Shop";
import Home from "../components/Home";
import Cart from "../components/Cart";
import ErrorPage from "../Error/errorPage";
import { Navbar } from "../components/Navbar";

const Router = [
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];

export default Router;
