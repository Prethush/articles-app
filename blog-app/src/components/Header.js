import {Link} from "react-router-dom";

function Header(props) {
     let user = props.userInfo;
    return (
       
        <header className="flex justify-between bg-gray-300 px-20 py-8 items-center">
                < Link to="/">
                        <h1 className="text-4xl font-extrabold text-green-500 font-logo">Blog App</h1>
                </Link>
                <nav>
                    <ul className="flex">
                        < Link to="/register">
                                <li className="bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6">Sign up</li>
                        </Link>
                        < Link to="/login">
                                <li className="bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6">Log in</li>
                        </Link>
                        {/* <Link to="">
                            <li className={user ? "text-xl": "hidden"}>
                                <i class="fas fa-user"></i>
                                <span>{user.username}</span>
                            </li>
                        </Link> */}
                    </ul>
                </nav>
        </header>
    )
}

export default Header;