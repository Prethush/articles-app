import {BrowserRouter as Router} from "react-router-dom";
import Header from "./Header";
import React from "react";
import { userURL } from "../utils/constant";
import FullPageLoader from "./FullPageLoader";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

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

        handleLogout = () => {
            this.setState({isLoggedIn: false});
        }
    
        render() {
                if(this.state.loading) {
                    return < FullPageLoader />
                }
                
            return (
                < Router>
                    < Header {...this.state} handleLogout={this.handleLogout}/>
                    {
                        this.state.isLoggedIn ? < AuthenticatedApp {...this.state} handleUser={this.handleUser}/> : < UnauthenticatedApp handleUser = {this.handleUser} {...this.state}/>
                    }
                </Router>
            )
        }
    }

    

    
export default App;