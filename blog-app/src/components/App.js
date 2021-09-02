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
import Loader from "./Loader";

class App extends React.Component{
       
    constructor(props) {
        super();
        this.state = {
            isLoggedIn: false,
            userInfo: "",
            loading: true
        }
    }

   componentDidMount = () => {
       let token = localStorage.getItem("token");
       if(token) {
           let bearer = "Bearer " + token;
           fetch(userURL, {
               method: "GET",
               headers: {
                   "Content-type": "application/json",
                   "Authorization": bearer
               }
           })
           .then((res) => res.json())
           .then((data) => {
               if(data.user) {
                   this.setState({isLoggedIn: true, userInfo: data.user, loading: false})
               }
           })
           .catch((err) => console.log(err));
       }
   }
    
        render() {
            if(this.state.loading) {
                return < Loader />
            }
            return (
                < Router>
                    < Header/>
                    < Switch >
                        < Route path="/" exact>
                           {this.state.isLoggedIn ? < Redirect to="/dashboard" /> : < Home {...this.state}/>} 
                        </Route>
                        < Route path="/articles" exact>
                            < Main/>
                        </Route>
                        < Route path="/articles/:slug" component={Article} />
                        < Route path="/register">
                            < Signup />
                        </Route>
                        < Route path="/login">
                            < Signin />
                        </Route>
                        < Route path="/dashboard">
                            < Dashboard/>
                        </Route>
                        < Route path="*">
                            < Nomatch />
                        </Route>
                    </Switch>
                </Router>
            )
        }
    }


export default App;