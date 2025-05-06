import { Link, Outlet } from "react-router-dom";

export const Navbar = () => {
    return (
        <div>
            <h1>Fake Store</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <hr />
                <Outlet/>
            </div>
        </div>
    );
}