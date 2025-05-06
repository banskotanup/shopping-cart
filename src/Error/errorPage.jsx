import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div>
            <h1>404 ERROR...</h1>
            <p>We could not find the requested page.</p>
            <Link to="/">Go back to home</Link>
        </div>
    );
}