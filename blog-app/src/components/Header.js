import {Link} from "react-router-dom";

function Header(props) {
     
    return (
       
        <header className="flex justify-between bg-gray-300 px-20 py-8 items-center">
                < Link to="/">
                        <h1 className="text-4xl font-extrabold text-green-500 font-logo">Blog App</h1>
                </Link>
                <nav>
                    <ul className="flex">
                        < Link to="/register">
                                <li className={props.isLoggedIn ? "hidden": "bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6"}>Sign up</li>
                        </Link>
                        < Link to="/login">
                                <li className={props.isLoggedIn ? "hidden": "bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6"}>Log in</li>
                        </Link>

                        <Link to="">
                            <li className={props.isLoggedIn ? "flex items-center text-xl mx-3": "hidden"}>
                                <i className="fas fa-user mr-2"></i>
                                <span className="">{props.user.username}</span>
                            </li>
                        </Link>
                        <Link to="">
                            <li className={props.isLoggedIn ? "text-xl mx-3": "hidden"}>
                                <span className="">Setings</span>
                            </li>
                        </Link>
                        <Link to="">
                            <li className={props.isLoggedIn ? "text-xl mx-3": "hidden"}>
                                <span className="">New Article</span>
                            </li>
                        </Link>
                        <Link to="">
                            <li className={props.isLoggedIn ? "text-xl mx-3": "hidden"}>
                                <span className="">Profile</span>
                            </li>
                        </Link>
                    </ul>
                </nav>
        </header>
    )
}

export default Header;