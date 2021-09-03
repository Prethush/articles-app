import React from "react";
import {Link, Redirect} from "react-router-dom";
import { validate } from "../utils/validate";
import { registerURL } from "../utils/constant";

class Signup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            username: "",
            email: "",
            passwd: "",
            isRegistered: false,
            userInfo: "",
            errors: {
                username: "",
                passwd: "",
                email: ""
            }
        };
    }

    handleChange = ({target}) => {
        let {name, value} = target;
        let errors = this.state.errors;
         validate(errors, name, value);
        this.setState({[name]: value, errors});
     }

    handleSubmit = (event) => {
        let {username, passwd, email, errors} = this.state;
        event.preventDefault();
        if(username && passwd && email) {
            fetch(registerURL, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        username: username,
                        email: email,
                        password: passwd
                    }
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res) => {
               if(res.status === 404) {
                   throw new Error(res.statusText);
               }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if(data.user) {
                    this.setState({username: "", passwd: "", email: "", isRegistered: true})
                }
                if(data.errors){
                    for(let key in data.errors){
                        errors[key] = `${key} ${data.errors[key]}`;
                    }
                    this.setState({username: "", passwd: "", email: "", errors});
                }
            })
            .catch((err) => {
                this.setState({username: "", passwd: "", email: "", info: "Something Went Wrong"});
            })
            
        }
       
    }

    render() {
        let {username, passwd, email} = this.state.errors;
        let {info} = this.state;
        if(info) {
            return <h2 className="text-red-500 text-center text-xl mt-8">{info}</h2>
        }
        if(this.state.isRegistered) {
          return  < Redirect to="/login" />
        }
        return (
            <main>
                <section className="mt-20">
                    <form className="w-1/3 mx-auto border border-gray-400 p-6 rounded-md" onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <legend className="text-2xl font-bold">Sign Up</legend>
                            < Link to="/login">
                                <span className="text-blue-700 text-lg text-center">Have an account? </span>
                            </Link>
                        </div>
                        <fieldset className="my-3">
                            <span className="text-red-500">{info}</span>
                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="text" placeholder="Enter Username" value={this.state.username} name="username" onChange={(e) => this.handleChange(e)}/>
                            <span className="text-red-500">{username}</span>

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="text" placeholder="Enter Email" value={this.state.email} name="email" onChange={(e) => this.handleChange(e)}/>
                            <span className="text-red-500">{email}</span>

                            <input className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"type="password" placeholder="Enter Password" value={this.state.passwd} name="passwd" onChange={(e) => this.handleChange(e)}/>
                            <span className="text-red-500">{passwd}</span>

                            <input type="submit" value="Sign Up" className="block w-full my-6 py-2 px-3 bg-blue-500 text-white font-bold cursor-pointer" disabled={username || email || passwd}/>
                        </fieldset>
                    </form>
                </section>
            </main>
        )
    }
}

export default Signup;