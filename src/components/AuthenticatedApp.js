import {Route, Switch} from "react-router-dom";
import Main from "./Main";
import Article from "./Article";
import Nomatch from "./Nomatch";
import React from "react";
import NewArticle from "./NewArticle";
import Settings from "./Settings";
import Profile from "./Profile";
import UpdateArticle from "./UpdateArticle";

function AuthenticatedApp(props) {
        
    return (
        < Switch >
            < Route path="/" exact>
                < Main {...props} />
            </Route>
        
            < Route path="/articles" exact>
                < Main {...props} />
            </Route>
            < Route path="/articles/edit/:slug">
                < UpdateArticle />
            </Route>
        
            < Route path="/articles/:slug">
                < Article {...props}/>
            </Route>
            < Route path="/addArticle">
                < NewArticle />
            </Route>
            < Route path="/settings">
                < Settings user={props.user} handleUser={props.handleUser}/>
            </Route>
            < Route path="/profiles/:id">
                < Profile user={props.user} isLoggedIn={props.isLoggedIn}/>
            </Route>
        
            < Route path="*">
                < Nomatch />
            </Route>
        </Switch>
    )
}

export default AuthenticatedApp;