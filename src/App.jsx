import Layout from "./components/layout";
import Home from "./pages/home";
import Detail from "./pages/detail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "/:slug",
            element: <Detail />,
        }
    ]
}]);

export default function App() {
    return (
        <RouterProvider router={router}/>
    );
}