import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="flex justify-between bg-gray-300 px-20 py-8">
                < Link to="/">
                        <h1 className="text-4xl font-extrabold text-green-500 font-logo">Blog App</h1>
                </Link>
                <nav>
                    <ul className="flex">
                        < Link to="/register">
                                <li className="bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6">Sign up</li>
                        </Link>
                        < Link to="/login">
                                <li className="bg-blue-500 py-3 px-4 text-white font-bold rounded-lg">Log in</li>
                        </Link>
                    </ul>
                </nav>
        </header>
    )
}

export default Header;