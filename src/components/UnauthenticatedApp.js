import {Route, Switch} from "react-router-dom";
import Main from "./Main";
import Signup from "./Signup";
import Signin from "./Signin";
import Article from "./Article";
import Nomatch from "./Nomatch";
import React from "react";



function UnauthenticatedApp(props) {
        
    return (
        < Switch >
            < Route path="/" exact>
                < Main {...props} />
            </Route>
            < Route path="/articles/:slug">
                < Article {...props}/>
            </Route>
            < Route path="/register">
                < Signup handleUser = {props.handleUser}/>
            </Route>
            < Route path="/login">
                < Signin handleUser={props.handleUser} />
            </Route>
            < Route path="*">
                < Nomatch />
            </Route>
        </Switch>
    )
}

export default UnauthenticatedApp;