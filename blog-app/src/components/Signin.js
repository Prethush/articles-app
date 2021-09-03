import React from "react";
import {Link, Redirect} from "react-router-dom";
import { loginURL } from "../utils/constant";


class Signin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            passwd: "",
            error: "",
            info: "",
            isLoggedIn: false
        };
    }


    handleChange = ({target}) => {
        let {name, value} = target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        let {email, passwd} = this.state;
        event.preventDefault();
       if(email && passwd) {
            fetch(loginURL, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: passwd
                    }
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res) => {
                console.log(res);
                if(res.status === 404) {
                    throw new Error(res.statusText);
                }
                return res.json()
            })
            .then((data) => {
                console.log(data);
                if(data.user) {
                    this.setState({email: "", passwd: "", isLoggedIn: true, info: ""}, () => this.handleLocalStorage(data.user));
                   
                }
                if(data.errors) {
                    let key = Object.keys(data.errors)[0];
                    this.setState({email: "", passwd: "", info: `${key} ${data.errors[key]}`});
                }
            })
            .catch((error) => this.setState({email: "", passwd: "", error: "Something Went Wrong"}))
       }    
    }

    handleLocalStorage = (user) => {
        localStorage.setItem("userInfo", JSON.stringify(user));
    }

    render() {
        let {info, error, isLoggedIn} = this.state;
        if(error) {
            return <h2 className="text-red-500 text-center text-xl mt-8">{error}</h2>
        }
        if(isLoggedIn) {
            return < Redirect to= "/dashboard" />
        }
        return (
            <main>
                <section className="mt-20">
                    <form className="w-1/3 mx-auto border border-gray-400 p-6 rounded-md" onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <legend className="text-2xl font-bold">Sign In</legend>
                            < Link to="/register">
                                <span className="text-blue-700 text-lg text-center">Need an account? </span>
                            </Link>
                        </div>
                        <fieldset className="my-3">

                            <span className="text-red-500">{info}</span>
                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="text" placeholder="Enter Email" value={this.state.email} name="email" onChange={(e) => this.handleChange(e)}/>
                           
                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="password" placeholder="Enter Password" value={this.state.passwd} name="passwd" onChange={(e) => this.handleChange(e)}/>
                        
                            <input type="submit" value="Login In" className="block w-full my-6 py-2 px-3 bg-blue-500 text-white font-bold cursor-pointer"/>

                        </fieldset>
                    </form>
                </section>
            </main>
        )
    }
}

export default Signin;