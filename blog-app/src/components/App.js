import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import Article from "./Article";
import Nomatch from "./Nomatch";
import Dashboard from "./Dashboard";
import React from "react";
import { userURL } from "../utils/constant";
import FullPageLoader from "./FullPageLoader";

class App extends React.Component{
       
    constructor(props) {
        super();
        this.state = {
            isLoggedIn: false,
            user: "",
            loading: true
        }
    }

   componentDidMount(){
      let token = localStorage.getItem("token");
      console.log(token)
       if(token) {
           let bearer = "Bearer " + token;
           fetch(userURL, {
               method: "GET",
               headers: {
                   "Authorization": bearer
               }
           })
           .then((res) => {
               if(!res.ok) {
                   return res.json().then(({errors}) => {
                       return Promise.reject(errors);
                   }) 
               }
               return res.json();
           })
           .then((data) => {
               console.log(data, "data");
               this.handleUser(data.user);
           })
           .catch((err) => console.log(err));
       }else {
           this.setState({loading: false});
       }
   }

        handleUser = (user) => {
            this.setState({isLoggedIn: true, user, loading: false});
            localStorage.setItem("token", user.token);
        }
    
        render() {
                if(this.state.loading) {
                    return < FullPageLoader />
                }
            return (
                < Router>
                    < Header {...this.state} />
                    {
                        this.state.isLoggedIn ? < AuthenticatedApp {...this.state}/> : < UnauthenticatedApp handleUser = {this.handleUser} {...this.state}/>
                    }
                </Router>
            )
        }
    }

    function UnauthenticatedApp(props) {
        console.log("Bye");
        return (
            < Switch >
            {/* < Route path="/" exact>
                < Home />
            </Route> */}
            < Route path="/" exact>
                < Main {...props} />
            </Route>
            < Route path="/articles/:slug" component={Article} />
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

    function AuthenticatedApp(props) {
        console.log("Hai");
        return (
        < Switch >
            {/* < Route path="/dashboar">
                < Dashboard {...props}/>
            </Route> */}
            < Route path="/" exact>
                < Main {...props} />
            </Route>
            < Route path="/articles" exact>
                < Main {...props} />
            </Route>
            < Route path="/articles/:slug" component={Article} />
            
            < Route path="*">
                < Nomatch />
            </Route>
        </Switch>
        )
    }

export default App;