import {NavLink, withRouter} from "react-router-dom";

function Header(props) {

    function handleLogout() {
        localStorage.clear();
        props.handleLogout();
        props.history.push("/");
    }
     
    return (
       
        <header className="flex justify-between bg-gray-300 px-20 py-8 items-center">
                < NavLink to="/">
                        <h1 className="text-4xl font-extrabold text-green-500 font-logo">Blog App</h1>
                </NavLink>
                <nav>
                    <ul className="flex">
                      {
                          props.isLoggedIn ? < Authenticated user = {props.user} handleLogout={handleLogout}/> : < Unauthenticated />
                      } 
                    </ul>
                </nav>
        </header>
    )
}

function Authenticated(props) {
    return (
        <>
            <NavLink activeClassName="active" to={{
                user: props.user,
                pathname: `/profiles/${props.user.username}`
                }}>
                <li className="flex items-center text-xl mx-3 ">
                    <i className="fas fa-user mr-2"></i>
                    <span className="">{props.user.username}</span>
                </li>
            </NavLink>

            <NavLink activeClassName="active" to="/settings">
                <li className="text-xl mx-3">
                    <i className="fas fa-cog mr-2"></i>
                    <span className="">Setings</span>
                </li>
            </NavLink>

            <NavLink activeClassName="active" to="/addArticle">
                <li className="text-xl mx-3">
                    <i className="fas fa-newspaper mr-2"></i>
                    <span className="">New Article</span>
                </li>
            </NavLink>

           <li className="text-xl">
               <span className="cursor-pointer" onClick={props.handleLogout}>Logout</span>
           </li>
        </>
    )
}

function Unauthenticated(props) {
    return (
        <>
              < NavLink to="/register">
                    <li className="bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6">Sign up</li>
             </NavLink>
             < NavLink to="/login">
                    <li className="bg-blue-500 py-3 px-4 text-white font-bold rounded-lg mr-6">Log in</li>
            </NavLink>

        </>
    )
}

export default withRouter(Header);