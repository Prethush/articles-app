import {NavLink, withRouter} from "react-router-dom";

function Header(props) {

    function handleLogout() {
        localStorage.clear();
        props.handleLogout();
        props.history.push("/");
    }
     
    return (
       
        <header className="flex flex-col items-center py-6 sm:flex sm:flex-col sm:py-4 lg:flex lg:flex-row lg:justify-between  bg-gray-100 lg:px-20  sm:px-12 sm:items-center">
                < NavLink to="/">
                        <h1 className="text-3xl py-4 sm:text-3xl md:text-4xl font-bold text-green-500 font-tertiary">Blog App</h1>
                </NavLink>
                <nav>
                    <ul className="flex flex-col text-xs sm:flex sm:flex-row">
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
            <NavLink activeClassName="active" to={`/profiles/${props.user.username}`}>
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

           <li className="text-xl mx-3">
               <span className="cursor-pointer" onClick={props.handleLogout}>Logout</span>
           </li>
        </>
    )
}

function Unauthenticated(props) {
    return (
        <>
              < NavLink activeClassName="active" to="/register">
                    <li className="text-xl mr-6">Sign up</li>
             </NavLink>
             < NavLink activeClassName="active" to="/login">
                    <li className="text-xl mr-6">Log in</li>
            </NavLink>

        </>
    )
}

export default withRouter(Header);