import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!user && <>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/registration">Registration</Link>
                    </li>
                </>
                }
                {user &&
                    <>
                        <li>
                            <Link to="/profilepage">Profile Page</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
            }
            