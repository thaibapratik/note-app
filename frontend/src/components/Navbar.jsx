import {Button} from "react-bootstrap";
import {Logout} from "../network/UserApi.js";
import {Link} from "react-router-dom";

const Navbar = ({loggedInUser, setLogoutSuccessful}) => {

    const handleLogout = async () => {
            await Logout();
            setLogoutSuccessful();
    }

    return (
        <nav>
            <h1>Notes app</h1>
            <div className="navbar-right">
                {!loggedInUser ? (
                    <>
                        <Link to="/signup"><Button>Sign up</Button></Link>
                        <Link to="/login"><Button>Log in</Button></Link>
                    </>
                ): (
                    <>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;