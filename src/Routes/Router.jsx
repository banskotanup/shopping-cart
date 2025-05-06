import Shop from "../components/Shop";
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
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];

export default Router;
